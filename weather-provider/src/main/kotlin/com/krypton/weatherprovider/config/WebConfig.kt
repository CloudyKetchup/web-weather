package com.krypton.weatherprovider.config

import com.krypton.weatherprovider.router.WeatherRouter
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.reactive.config.EnableWebFlux

@Configuration
@EnableWebFlux
class WebConfig
{
	@Bean
	fun weatherController(weatherRouter : WeatherRouter) = weatherRouter.router
}