package com.copperleaf.bootcamp

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.rest.core.annotation.RepositoryRestResource

@RepositoryRestResource(collectionResourceRel = "investments", path = "investments")
interface InvestmentRepository : JpaRepository<Investment, Long>