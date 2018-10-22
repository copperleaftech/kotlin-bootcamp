package com.copperleaf.bootcamp

import java.time.LocalDate
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id
import javax.persistence.JoinColumn
import javax.persistence.JoinTable
import javax.persistence.ManyToMany
import javax.persistence.Table
import javax.validation.constraints.NotNull

@Entity
@Table(name = "investment")
class Investment(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Int = 0,

    @NotNull
    val title: String = "",

    @NotNull
    @Column(name = "sponsor_name")
    val sponsorName: String = "",

    @NotNull
    @Column(name = "required_by")
    val requiredBy: LocalDate = LocalDate.now(),

    @NotNull
    @Column(name = "project_reason")
    val projectReason: String = "",

    @NotNull
    @Column(name = "project_scope")
    val projectScope: String = "",

    @ManyToMany()
    @JoinTable(name = "investment_asset",
        joinColumns = arrayOf(JoinColumn(name = "asset_id", referencedColumnName = "id")),
        inverseJoinColumns = arrayOf(JoinColumn(name = "investment_id", referencedColumnName = "id"))
    )
    val assets: List<Asset> = listOf()
)
