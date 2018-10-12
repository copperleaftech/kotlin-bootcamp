package com.copperleaf.bootcamp

import java.net.URI

import org.assertj.core.api.Assertions.assertThat
import org.junit.Test
import org.junit.runner.RunWith

import org.slf4j.LoggerFactory

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment
import org.springframework.boot.test.web.client.TestRestTemplate
import org.springframework.core.ParameterizedTypeReference
import org.springframework.http.HttpMethod
import org.springframework.http.HttpStatus
import org.springframework.http.RequestEntity
import org.springframework.http.ResponseEntity
import org.springframework.test.context.junit4.SpringRunner


@RunWith(SpringRunner::class)
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
class AssetControllerTests {

    companion object {
        val LOG = LoggerFactory.getLogger(AssetControllerTests::class.java.name)
    }

    @Autowired
    lateinit var restTemplate: TestRestTemplate

    @Test
    fun testController() {
//        logging that doesn't log :(
        LOG.error("test error")
        LOG.warn("test warning")
        println("test println")

//        ref https://stackoverflow.com/a/39688441 for why getForObject()/getForEntity() won't work with List<Asset>
//        val request: RequestEntity<Any> = RequestEntity<Any>(HttpMethod.GET, URI.create("/assets"))
//        val response: ResponseEntity<List<Asset>> = this.restTemplate.exchange(request, object: ParameterizedTypeReference<List<Asset>>() {})
//        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK)
//
//        val assets: List<Asset>? = response.getBody()
//        assertThat(assets?.size).isEqualTo(5)
//        assets?.let {
//            for ((index, asset) in assets.withIndex()) {
//                assertThat(asset.id).isEqualTo(index)
//                assertThat(asset.name).isEqualTo("Asset #${ index + 1 }")
//            }
//        }
    }

}
