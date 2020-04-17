package com.krypton.accountservice.config

import com.krypton.accountservice.router.AccountRouter
import org.springframework.cloud.client.loadbalancer.LoadBalanced
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.reactive.config.EnableWebFlux
import org.springframework.web.reactive.function.client.WebClient

@Configuration
@EnableWebFlux
class WebConfig
{
	@Bean
	fun accountController(accountRouter : AccountRouter) = accountRouter.router

	@Bean
	@LoadBalanced
	fun loadBalancedWebClientBuilder() : WebClient.Builder = WebClient.builder()
}