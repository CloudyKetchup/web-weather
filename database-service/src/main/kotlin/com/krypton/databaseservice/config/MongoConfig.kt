package com.krypton.databaseservice.config

import com.krypton.databaseservice.repository.UserRepository
import com.mongodb.reactivestreams.client.MongoClient
import com.mongodb.reactivestreams.client.MongoClients
import org.springframework.context.annotation.Configuration
import org.springframework.data.mongodb.config.AbstractReactiveMongoConfiguration
import org.springframework.data.mongodb.repository.config.EnableReactiveMongoRepositories

@Configuration
@EnableReactiveMongoRepositories(basePackageClasses = [UserRepository::class])
class MongoConfig : AbstractReactiveMongoConfiguration()
{
	override fun autoIndexCreation() : Boolean = true

	override fun reactiveMongoClient() : MongoClient = MongoClients.create()

	override fun getDatabaseName() : String = "weather_app"
}
