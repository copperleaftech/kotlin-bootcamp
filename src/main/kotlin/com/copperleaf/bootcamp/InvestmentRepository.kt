package com.copperleaf.bootcamp

import org.springframework.data.repository.CrudRepository
import org.springframework.data.rest.core.annotation.RepositoryRestResource
import org.springframework.web.bind.annotation.CrossOrigin

@CrossOrigin(origins = ["http://localhost", "http://192.168.11.55"])
@RepositoryRestResource(collectionResourceRel = "investments", path = "investments")
interface InvestmentRepository : CrudRepository<Investment, Int>
