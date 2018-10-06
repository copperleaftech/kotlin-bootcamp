package com.copperleaf.bootcamp

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class AssetController {

    @GetMapping("/assets")
    fun getAssets(): List<Asset> {
        val assets: List<Asset> = (0..4).map { it -> Asset(id = it, name = "Asset #${it + 1}") }

        return assets
    }

}