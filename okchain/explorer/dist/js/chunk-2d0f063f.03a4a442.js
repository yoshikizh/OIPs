(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0f063f"],{"9bbb":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container",staticStyle:{"margin-top":"20px"}},[a("b-breadcrumb",{attrs:{items:t.breadcrumbItems}}),a("b-card",{staticStyle:{"margin-top":"20px","background-color":"white"}},[a("b-table",{staticClass:"align-table",attrs:{"head-variant":"light",fields:t.fields,items:t.items},scopedSlots:t._u([{key:"cell(detail)",fn:function(e){return[a("a",{attrs:{href:"/#/tradePair/"+e.item.base_asset_symbol+"_"+e.item.quote_asset_symbol}},[t._v(t._s(t.$t("common.detail")))])]}}])}),a("b-overlay",{attrs:{show:t.showOverlay,"no-wrap":""}})],1)],1)},r=[],i=(a("d81d"),a("5530")),n=a("9225"),l=a("4360"),o={name:"Tokens",created:function(){var t=this,e=l["a"].state.tradePairs.length>0;e?(this.getTradePairs(),this.showOverlay=!1):l["a"].dispatch("apiGetTradePairs").then((function(){t.getTradePairs(),t.showOverlay=!1}))},computed:{breadcrumbItems:function(){return[{text:n["a"].t("names.homepage"),href:"/#/"},{text:n["a"].t("names.tradePair"),active:!0}]},fields:function(){return[{key:"base_asset_symbol",label:n["a"].t("tradePair.baseAsset")},{key:"quote_asset_symbol",label:n["a"].t("tradePair.quoteAsset")},{key:"price",label:n["a"].t("common.price")},{key:"detail",label:n["a"].t("common.detail")}]}},data:function(){return{showOverlay:!0,items:[]}},methods:{getTradePairs:function(){this.items=l["a"].state.tradePairs.map((function(t){return Object(i["a"])({detail:""},t)}))}}},c=o,d=a("2877"),m=Object(d["a"])(c,s,r,!1,null,null,null);e["default"]=m.exports}}]);
//# sourceMappingURL=chunk-2d0f063f.03a4a442.js.map