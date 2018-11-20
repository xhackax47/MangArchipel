package MangArchipelBack.config;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.Http403ForbiddenEntryPoint;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.security.web.authentication.logout.SimpleUrlLogoutSuccessHandler;
import org.springframework.stereotype.Component;

import MangArchipelBack.services.security.AppAuthProvider;
import MangArchipelBack.services.security.UserService;

@Configuration
@EnableWebSecurity

@EnableGlobalMethodSecurity(securedEnabled = true, jsr250Enabled = true, prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	UserService userDetailsService;

	// @Autowired
	// private AccessDeniedHandler accessDeniedHandler;

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userDetailsService);
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.cors().and().csrf().disable().exceptionHandling()
				.authenticationEntryPoint(new Http403ForbiddenEntryPoint() {
				}).and().authenticationProvider(getProvider()).formLogin()
				.successHandler(new AuthentificationLoginSuccessHandler())
				.failureHandler(new SimpleUrlAuthenticationFailureHandler())
				.failureHandler(new AuthenticationFailureHandler()).and().logout().logoutUrl("/api/users/logout")
				.logoutSuccessHandler(new AuthentificationLogoutSuccessHandler()).invalidateHttpSession(true).and()
				.authorizeRequests().antMatchers("/api/users/login").permitAll().anyRequest().anonymous()
				.antMatchers("/api/users/logout").permitAll().anyRequest().anonymous()
				.antMatchers("/api/users/user").permitAll().anyRequest().authenticated()
				.antMatchers("/api/products").permitAll().anyRequest().anonymous()
				;

	}

	private class AuthentificationLoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

		@Override
		public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
				Authentication authentication) throws IOException, ServletException {
			response.setStatus(HttpServletResponse.SC_OK);
		}
	}

	private class AuthentificationLogoutSuccessHandler extends SimpleUrlLogoutSuccessHandler {

		@Override
		public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response,
				Authentication authentication) throws IOException, ServletException {
			System.out.println("Disconnected");
			response.setStatus(HttpServletResponse.SC_OK);

		}
	}

	public class AuthenticationFailureHandler extends SimpleUrlAuthenticationFailureHandler {

		@Override
		public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
				AuthenticationException exception) throws IOException, ServletException {
			super.onAuthenticationFailure(request, response, exception);
			System.out.println("toto3");
			response.setStatus(HttpServletResponse.SC_FORBIDDEN);
		}
	}

	@Bean
	public AuthenticationProvider getProvider() {

		AppAuthProvider provider = new AppAuthProvider();
		provider.setUserDetailsService(userDetailsService);
		return provider;

	}

	@Bean
	@Override
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}

}
