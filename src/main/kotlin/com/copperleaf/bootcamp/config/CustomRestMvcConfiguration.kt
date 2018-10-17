package com.copperleaf.bootcamp.config

import com.copperleaf.bootcamp.Asset
import com.copperleaf.bootcamp.Investment

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.data.rest.core.config.RepositoryRestConfiguration
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer

@Configuration
open class CustomRestMvcConfiguration {

    @Bean
    open fun repositoryRestConfigurer(): RepositoryRestConfigurer {

        return object : RepositoryRestConfigurerAdapter() {

            override fun configureRepositoryRestConfiguration(config: RepositoryRestConfiguration?) {
                config!!.exposeIdsFor(
                    Asset::class.java,
                    Investment::class.java
                )
            }
        }
    }
}