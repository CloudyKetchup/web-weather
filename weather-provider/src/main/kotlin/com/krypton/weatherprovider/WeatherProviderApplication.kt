package com.krypton.weatherprovider

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.cloud.netflix.eureka.EnableEurekaClient

@SpringBootApplication
@EnableEurekaClient
class WeatherProviderApplication

fun main(args: Array<String>) {
	runApplication<WeatherProviderApplication>(*args)
}
