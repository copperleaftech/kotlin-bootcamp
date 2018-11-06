package com.copperleaf.bootcamp

import java.net.URI
import org.assertj.core.api.Assertions.assertThat
import org.junit.Test
import org.junit.runner.RunWith
import org.json.JSONObject

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment
import org.springframework.boot.test.web.client.TestRestTemplate
import org.springframework.core.ParameterizedTypeReference
import org.springframework.data.repository.CrudRepository
import org.springframework.http.HttpEntity
import org.springframework.http.HttpMethod
import org.springframework.http.HttpStatus
import org.springframework.http.RequestEntity
import org.springframework.http.ResponseEntity
import org.springframework.test.context.junit4.SpringRunner

@RunWith(SpringRunner::class)
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
class AssetRepositoryTests {

    @Autowired
    lateinit var repository: CrudRepository<Asset, Int>

    @Autowired
    lateinit var restTemplate: TestRestTemplate

    val url = URI.create("/v1/assets")

    @Test
    fun testCreateAsset() {
        val asset = Asset(name = "Test Asset", type = "Test Asset Type", location = "Test Location")

        val request = HttpEntity(asset)
        val response: ResponseEntity<Asset> = this.restTemplate.postForEntity(url, request, Asset::class.java)

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED)
        val createdAsset = response.getBody()
        assertThat(createdAsset?.id).isNotNull()
        assertThat(createdAsset?.name).isEqualTo(asset.name)
        assertThat(createdAsset?.type).isEqualTo(asset.type)
        assertThat(createdAsset?.location).isEqualTo(asset.location)
    }

    @Test
    fun testGetAssets() {
        val response: String = this.restTemplate.getForObject(url, String::class.java)
        val assets: JSONObject = JSONObject(response)

        val assetsList = assets.getJSONObject("_embedded").getJSONArray("assets")
        assertThat(assetsList.length()).isNotEqualTo(0)
    }
}
