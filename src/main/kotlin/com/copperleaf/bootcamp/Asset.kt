package com.copperleaf.bootcamp

import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id
import javax.persistence.ManyToMany
import javax.persistence.Table
import javax.validation.constraints.NotNull

@Entity
@Table(name = "asset")
class Asset(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Int = 0,

    @NotNull
    val name: String = "",

    @NotNull
    val type: String = "",

    @NotNull
    val location: String = "",

    @ManyToMany(mappedBy = "assets")
    val investments: List<Investment> = listOf()
)