package com.krypton.databaseservice.config

import com.krypton.databaseservice.routes.UserRouter
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.reactive.config.EnableWebFlux
import org.springframework.web.reactive.config.WebFluxConfigurer

@Configuration
@EnableWebFlux
class WebConfig : WebFluxConfigurer
{
	@Bean
	fun userController(userRouter : UserRouter) = userRouter.router
}