package com.copperleaf.bootcamp

import org.assertj.core.api.Assertions.assertThat
import org.junit.Test
import org.junit.runner.RunWith

import org.slf4j.LoggerFactory

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment
import org.springframework.boot.test.web.client.TestRestTemplate
import org.springframework.boot.web.server.LocalServerPort
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
        LOG.error("test error")
        LOG.warn("test warning")
        assertThat(this.restTemplate.getForObject("/assets",
                String::class.java)).contains("Asset")
    }

}
