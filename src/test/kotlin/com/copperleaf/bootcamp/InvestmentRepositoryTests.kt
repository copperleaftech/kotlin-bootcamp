package com.copperleaf.bootcamp

import java.net.URI
import java.time.LocalDate
import java.time.Month

import org.assertj.core.api.Assertions.assertThat
import org.junit.Test
import org.junit.runner.RunWith
import org.json.JSONObject

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment
import org.springframework.boot.test.web.client.TestRestTemplate
import org.springframework.boot.web.server.LocalServerPort
import org.springframework.core.ParameterizedTypeReference
import org.springframework.data.repository.CrudRepository
import org.springframework.http.HttpEntity
import org.springframework.http.HttpHeaders
import org.springframework.http.MediaType
import org.springframework.http.HttpMethod
import org.springframework.http.HttpStatus
import org.springframework.http.RequestEntity
import org.springframework.http.ResponseEntity
import org.springframework.test.context.junit4.SpringRunner

@RunWith(SpringRunner::class)
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
class InvestmentRepositoryTests {

    @Autowired
    lateinit var repository: CrudRepository<Asset, Int>

    @Autowired
    lateinit var restTemplate: TestRestTemplate

    @LocalServerPort
    var randomServerPort: Int = 0


    val url = URI.create("/v1/investments")

    @Test
    fun testCreateInvestment() {
        // create investment
        val investment = Investment(
                title = "Test Investment",
                sponsorName = "Test Sponsor",
                requiredBy = LocalDate.now(),
                projectReason = "Test reason",
                projectScope = "Test scope")

        val request = HttpEntity(investment)
        val response: ResponseEntity<Investment> = this.restTemplate.postForEntity(url, request, Investment::class.java)

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED)
        val createdInvestment = response.getBody()
        assertThat(createdInvestment?.id).isNotNull()
        assertThat(createdInvestment?.title).isEqualTo(investment.title)
        assertThat(createdInvestment?.sponsorName).isEqualTo(investment.sponsorName)
        assertThat(createdInvestment?.requiredBy).isEqualTo(investment.requiredBy)
        assertThat(createdInvestment?.projectReason).isEqualTo(investment.projectReason)
        assertThat(createdInvestment?.projectScope).isEqualTo(investment.projectScope)

        // create asset in order to add many to many relationship
        val assetUrl = URI.create("/v1/assets")
        val asset = Asset(name = "Test Asset m2m", type = "Test Asset Type m2m", location = "Test Location m2m")
        val assetRequest = HttpEntity(asset)
        val assetResponse: ResponseEntity<Asset> = this.restTemplate.postForEntity(assetUrl, assetRequest, Asset::class.java)
        val createdAsset = assetResponse.getBody()
        val createdAssetId = createdAsset?.id

        // add asset to investment
        val investmentId = createdInvestment?.id
        val requestHeaders = HttpHeaders()
        requestHeaders.setContentType(MediaType("text", "uri-list"))

        val putUrl = URI.create("/v1/investments/$investmentId/assets")
        val assetUri = "http://localhost:$randomServerPort/v1/assets/$createdAssetId"
        val putRequest = HttpEntity(assetUri, requestHeaders)
        this.restTemplate.put(putUrl, putRequest)

        val putResponse: String = this.restTemplate.getForObject(putUrl, String::class.java)
        val assets: JSONObject = JSONObject(putResponse)
        val assetsList = assets.getJSONObject("_embedded").getJSONArray("assets")

        assertThat(assetsList.length()).isEqualTo(1)
        assertThat(assetsList.getJSONObject(0).get("id")).isEqualTo(createdAssetId)
    }
}
