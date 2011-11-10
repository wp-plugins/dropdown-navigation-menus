<?php
/*
Plugin Name: Dropdown Navigation Menus
Description: This widget allows you to build a customized dropdown menu of your WP3.0 Menus.
Version: 0.1
Author: Hassan Derakhshandeh
Author URI: http://tween.ir/

		* 	Copyright (C) 2011  Hassan Derakhshandeh
		*	http://tween.ir/
		*	hassan.derakhshandeh@gmail.com

		This program is free software; you can redistribute it and/or modify
		it under the terms of the GNU General Public License as published by
		the Free Software Foundation; either version 2 of the License, or
		(at your option) any later version.

		This program is distributed in the hope that it will be useful,
		but WITHOUT ANY WARRANTY; without even the implied warranty of
		MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
		GNU General Public License for more details.

		You should have received a copy of the GNU General Public License
		along with this program; if not, write to the Free Software
		Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
*/

define( DDNM_VERSION, '0.1' );

/**
 * Navigation Menu widget class
 *
 * @since 0.1
 */
class Dropdown_Navigation_Menus extends WP_Widget {

	private $textdomain;

	function Dropdown_Navigation_Menus() {
		$widget_ops = array( 'description' => __( 'Use this widget to add one of your custom menus as a widget.', $this->textdomain ) );
		$this->WP_Widget( "dropdown-navigation-menu", __( 'Dropdown Navigation Menu', $this->textdomain ), $widget_ops, null );
		add_action( 'template_redirect', array( &$this, 'queue' ) );
	}

	/**
	 * Queue the scripts and styles for front-end
	 * We make sure that we only load files that we need
	 *
	 * @since 0.1
	 * @return void
	 */
	function queue() {
		wp_enqueue_script( 'dropdown-nav-menus', plugins_url( 'js/plugins-min.js', __FILE__ ), array( 'jquery' ), DDNM_VERSION );
		$widget_instances = get_option( $this->option_name );
		if( is_active_widget( false, false, $this->id_base, true ) && $widget_instances ) {
			foreach( $widget_instances as $widget ) {
				if( $widget['superfishcss'] == 1 )
					wp_enqueue_style( 'superfish', plugins_url( 'css/superfish.css', __FILE__ ), array(), DDNM_VERSION );
			}
		}
	}

	function widget( $args, $instance ){
		// Get menu
		$nav_menu = wp_get_nav_menu_object( $instance['nav_menu'] );

		if ( !$nav_menu )
			return;

		$instance['title'] = apply_filters('widget_title', $instance['title'], $instance, $this->id_base);

		echo $args['before_widget'];

		if ( !empty($instance['title']) )
			echo $args['before_title'] . $instance['title'] . $args['after_title'];

		wp_nav_menu( array( 'fallback_cb' => '', 'menu' => $nav_menu ) );
		?>
		<script>
			jQuery(function($){
				$('#<?php echo $this->id ?> ul')
					<?php if( $instance['superfishcss'] == 1 ) : ?>
					.addClass('sf-menu')
					<?php endif; ?>
					<?php if( $instance['supersubs'] == 1 ) : ?>
					.supersubs({ minWidth: 12, maxWidth: 27, extraWidth: 1 })
					<?php endif; ?>
					.superfish();
			});
		</script>

		<?php
		echo $args['after_widget'];
	}

	function update( $new_instance, $old_instance ) {
		$instance['title'] = strip_tags( stripslashes($new_instance['title']) );
		$instance['nav_menu'] = (int) $new_instance['nav_menu'];
		$instance['supersubs'] = (int) $new_instance['supersubs'];
		$instance['superfishcss'] = (int) $new_instance['superfishcss'];
		return $instance;
	}

	function form( $instance ) {
		$title = isset( $instance['title'] ) ? $instance['title'] : '';
		$nav_menu = isset( $instance['nav_menu'] ) ? $instance['nav_menu'] : '';

		// Get menus
		$menus = get_terms( 'nav_menu', array( 'hide_empty' => false ) );

		// If no menus exists, direct the user to go and create some.
		if ( !$menus ) {
			echo '<p>'. sprintf( __('No menus have been created yet. <a href="%s">Create some</a>.'), admin_url('nav-menus.php') ) .'</p>';
			return;
		}
		?>
		<p>
			<label for="<?php echo $this->get_field_id('title'); ?>"><?php _e('Title:') ?></label>
			<input type="text" class="widefat" id="<?php echo $this->get_field_id('title'); ?>" name="<?php echo $this->get_field_name('title'); ?>" value="<?php echo $title; ?>" />
		</p>
		<p>
			<label for="<?php echo $this->get_field_id('nav_menu'); ?>"><?php _e('Select Menu:'); ?></label>
			<select id="<?php echo $this->get_field_id('nav_menu'); ?>" name="<?php echo $this->get_field_name('nav_menu'); ?>" class="widefat">
		<?php
			foreach ( $menus as $menu ) {
				$selected = $nav_menu == $menu->term_id ? ' selected="selected"' : '';
				echo '<option'. $selected .' value="'. $menu->term_id .'">'. $menu->name .'</option>';
			}
		?>
			</select>
		</p>
		<p>
			<label><input type="checkbox" name="<?php echo $this->get_field_name('supersubs'); ?>" value="1" <?php checked( $instance['supersubs'], 1 ) ?> /> <?php _e('Enable Supersubs?') ?></label>
		</p>
		<p>
			<label><input type="checkbox" name="<?php echo $this->get_field_name('superfishcss'); ?>" value="1" <?php checked( $instance['superfishcss'], 1 ) ?> /> <?php _e('load superfish.css file?') ?></label>
		</p>
		<?php
	}
}

function register_Dropdown_Navigation_Menus_widget() {
	register_widget( 'Dropdown_Navigation_Menus' );
}
add_action( 'widgets_init', 'register_Dropdown_Navigation_Menus_widget' );