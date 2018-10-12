package com.copperleaf.bootcamp

import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id
import javax.persistence.JoinColumn
import javax.persistence.ManyToOne
import javax.persistence.Table
import javax.validation.constraints.NotNull

@Entity
@Table(name = "asset")
class Asset(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Int,

    @NotNull
    val name: String,

    @NotNull
    val type: String,

    @NotNull
    val location: String,

    @NotNull
    @Column(name = "value_measures")
    val valueMeasures: String,

    @ManyToOne
    @JoinColumn(name = "investment_id")
    val investment: Investment
)