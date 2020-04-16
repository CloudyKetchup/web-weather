package com.krypton.databaseservice.repository

import com.krypton.commonmodels.user.User
import org.springframework.data.mongodb.repository.DeleteQuery
import org.springframework.data.mongodb.repository.Query
import org.springframework.data.mongodb.repository.ReactiveMongoRepository
import org.springframework.stereotype.Repository
import reactor.core.publisher.Mono
import java.util.*

@Repository
interface UserRepository : ReactiveMongoRepository<User, UUID>
{
	/**
	 * Find user by name
	 *
	 * @param name	user name
	 * @return [Mono] with user
	 * */
	@Query("{ 'name' : ?0 }")
	fun findByName(name : String) : Mono<User>

	/**
	 * Delete user by name
	 *
	 * @param name	user name
	 * */
	@DeleteQuery("{ 'name' : ?0 }")
	fun deleteByName(name : String) :  Mono<Unit>
}