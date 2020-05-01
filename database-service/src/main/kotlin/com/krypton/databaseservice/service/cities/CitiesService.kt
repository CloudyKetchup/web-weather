package com.krypton.databaseservice.cities

import com.krypton.databaseservice.repository.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import reactor.core.publisher.Flux
import java.util.*

@Service
class CitiesService @Autowired constructor(private val userRepository : UserRepository)
{
	fun updateCities(id : String, cities : List<String>) : Flux<String>
	{
		return userRepository.findById(UUID.fromString(id))
			.doOnNext { it.cities = cities }
			.flatMap { userRepository.save(it) }
			.map { it.cities }
			.flatMapIterable { it }
	}

	fun getCities(id : String) : Flux<String>
	{
		return userRepository.findById(UUID.fromString(id))
			.flatMapIterable { it.cities }
	}
}