package com.krypton.databaseservice

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.cloud.netflix.eureka.EnableEurekaClient

@SpringBootApplication
@EnableEurekaClient
class DatabaseServiceApplication

fun main(args: Array<String>) {
	runApplication<DatabaseServiceApplication>(*args)
}
