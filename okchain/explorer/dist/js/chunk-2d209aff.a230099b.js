(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d209aff"],{a9b3:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container",staticStyle:{"margin-top":"20px"}},[a("b-breadcrumb",{attrs:{items:t.breadcrumbItems}}),a("b-card",{staticStyle:{"margin-top":"20px","background-color":"white"}},[a("b-table",{staticClass:"align-table",attrs:{"head-variant":"light",fields:t.fields,items:t.items},scopedSlots:t._u([{key:"cell(symble)",fn:function(e){return[a("a",{attrs:{href:"/#/token/"+e.item.symble}},[t._v(t._s(e.item.symble))])]}},{key:"cell(total_supply)",fn:function(e){return[t._v(" "+t._s(parseInt(e.item.total_supply))+" ")]}},{key:"cell(original_total_supply)",fn:function(e){return[t._v(" "+t._s(parseInt(e.item.original_total_supply))+" ")]}},{key:"cell(owner)",fn:function(e){return[a("a",{attrs:{href:"/#/address/"+e.item.owner}},[t._v(t._s(e.item.owner.slice(0,16)+"..."))])]}}])}),a("b-overlay",{attrs:{show:t.showOverlay,"no-wrap":""}})],1)],1)},l=[],o=a("4360"),s=a("9225"),r={name:"Tokens",created:function(){var t=this,e=o["a"].state.tokens.length>0;e?(this.getTokens(),this.showOverlay=!1):o["a"].dispatch("apiGetTokens").then((function(){t.getTokens(),t.showOverlay=!1}))},computed:{breadcrumbItems:function(){return[{text:s["a"].t("names.homepage"),href:"/#/"},{text:s["a"].t("names.token"),active:!0}]},fields:function(){return[{key:"symbol",label:s["a"].t("common.name")},{key:"whole_name",label:s["a"].t("token.fullName")},{key:"total_supply",label:s["a"].t("token.totalSupply")},{key:"original_symbol",label:s["a"].t("token.originName")},{key:"original_total_supply",label:s["a"].t("token.originSupply")},{key:"owner",label:s["a"].t("token.ownerAccount")},{key:"description",label:s["a"].t("common.description")}]}},data:function(){return{showOverlay:!0,items:[]}},methods:{getTokens:function(){this.items=o["a"].state.tokens}}},i=r,c=a("2877"),u=Object(c["a"])(i,n,l,!1,null,null,null);e["default"]=u.exports}}]);
//# sourceMappingURL=chunk-2d209aff.a230099b.js.map