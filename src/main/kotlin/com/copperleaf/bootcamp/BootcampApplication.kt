package com.copperleaf.bootcamp

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
open class BootcampApplication

fun main(args: Array<String>) {
    runApplication<BootcampApplication>(*args)
}
