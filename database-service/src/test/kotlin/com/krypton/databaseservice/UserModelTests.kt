package com.krypton.databaseservice

import com.krypton.commonmodels.user.User
import com.krypton.databaseservice.repository.UserRepository
import org.junit.jupiter.api.Test
import org.junit.runner.RunWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.junit4.SpringRunner
import reactor.core.scheduler.Schedulers

@SpringBootTest
@RunWith(SpringRunner::class)
class UserModelTests @Autowired constructor(
	private val userRepository : UserRepository
)
{
	@Test
	fun save()
	{
		userRepository.save(User(
			name = "CloudyKetchup",
			email = "krypton@yahoo.com",
			password = "1708")
		).subscribe { System.err.println(it) }
	}

	@Test
	fun updateName()
	{
		userRepository.findByName("CloudyKetchup")
			.map { it.apply { name = "test2" } }
			.flatMap { userRepository.save(it) }
			.subscribe { System.err.println(it) }
	}

	@Test
	fun findByName()
	{
		userRepository.findByName("test2")
			.subscribe { System.err.println(it) }
	}

	@Test
	fun deleteByName()
	{
		userRepository.deleteByName("test2")
			.subscribeOn(Schedulers.elastic())
			.subscribe()
	}

	@Test
	fun saveWithCities()
	{
		userRepository.save(User(
			name = "CitiesUser",
			email = "cityuser@gmail.com",
			password = "1708",
			cities = listOf("London", "Tokyo")
		)).subscribe { System.err.println(it) }
	}
}
