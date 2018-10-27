package com.copperleaf.bootcamp

import org.springframework.data.repository.CrudRepository
import org.springframework.data.rest.core.annotation.RestResource
import org.springframework.data.rest.core.annotation.RepositoryRestResource
import org.springframework.web.bind.annotation.CrossOrigin

@CrossOrigin(origins = ["http://localhost", "http://192.168.11.55"])
@RepositoryRestResource(collectionResourceRel = "assets", path = "assets")
interface AssetRepository : CrudRepository<Asset, Int> {

    @RestResource(path = "all")
    fun queryByNameContainingOrTypeContainingOrLocationContainingAllIgnoreCase(name: String, type: String, location: String): List<Asset>?

    @RestResource(path = "name")
    fun queryByNameContaining(name: String): List<Asset>?

    @RestResource(path = "type")
    fun queryByTypeContaining(type: String): List<Asset>?

    @RestResource(path = "location")
    fun queryByLocationContaining(location: String): List<Asset>?
}
