package com.copperleaf.bootcamp

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.rest.core.annotation.RepositoryRestResource
import org.springframework.web.bind.annotation.CrossOrigin

@CrossOrigin(origins = ["http://localhost"])
@RepositoryRestResource(collectionResourceRel = "assets", path = "assets")
interface AssetRepository : JpaRepository<Asset, Long>