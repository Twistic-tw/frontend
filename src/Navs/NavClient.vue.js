import { RouterLink, RouterView } from 'vue-router';
import '../styles.css';
import { ref } from 'vue';
const sideExpanded = ref(false);
const ToggleSidenav = () => {
    sideExpanded.value = !sideExpanded.value;
};
const navExpanded = ref(false);
const ToggleNav = () => {
    navExpanded.value = !navExpanded.value;
    console.log(navExpanded.value);
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "flex h-screen" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.nav, __VLS_intrinsicElements.nav)(Object.assign({ class: "flex h-17 items-center bg-gradient-to-l from-neutral-950 to-slate-800 w-full fixed top-0" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "flex justify-end flex-1" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ onClick: (__VLS_ctx.ToggleNav) }, { class: "rounded-tl-2xl rounded-br-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 size-12 mr-15 transition-all duration-300 ease-in-out hover:shadow-[0px_0px_10px_2px_rgba(255,_255,_255,_0.2)]" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ onClick: (__VLS_ctx.ToggleSidenav) }, { class: "peer bg-neutral-950 w-21 h-[68px] rounded-tr-3xl flex text-3xl items-center justify-center transition-all duration-200 ease-in-out hover:text-4xl hover:shadow-[13px_16px_0px_1px_rgba(0,_0,_0,_0.5)] fixed top-0" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)(Object.assign({ class: "text-white " }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "flex overflow-hidden fixed h-full mt-[68px] shadow-none transition-all duration-200 ease-in-out peer-hover:shadow-[13px_18px_0px_1px_rgba(0,_0,_0,_0.5)] w-21" }, { class: ({ 'w-54 rounded-tr-3xl': __VLS_ctx.sideExpanded }) }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.nav, __VLS_intrinsicElements.nav)(Object.assign({ class: "flex-1 w-19 flex-shrink-0 overflow-y-auto bg-gradient-to-b from-neutral-950 to-slate-800 p-3 " }));
const __VLS_0 = {}.RouterLink;
/** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0(Object.assign(Object.assign(Object.assign({ to: "/pdf" }, { class: "relative mb-2 flex p-3 rounded-4xl hover:bg-gradient-to-r from-indigo-600 to-cyan-500  items-center" }), { class: ({ 'w-48': __VLS_ctx.sideExpanded }) }), { activeClass: "bg-slate-900" })));
const __VLS_2 = __VLS_1(Object.assign(Object.assign(Object.assign({ to: "/pdf" }, { class: "relative mb-2 flex p-3 rounded-4xl hover:bg-gradient-to-r from-indigo-600 to-cyan-500  items-center" }), { class: ({ 'w-48': __VLS_ctx.sideExpanded }) }), { activeClass: "bg-slate-900" }), ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_3.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)(Object.assign({ class: "w-9 min-w-9" }, { viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.g, __VLS_intrinsicElements.g)({
    id: "SVGRepo_bgCarrier",
    'stroke-width': "0",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.g, __VLS_intrinsicElements.g)({
    id: "SVGRepo_tracerCarrier",
    'stroke-linecap': "round",
    'stroke-linejoin': "round",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.g, __VLS_intrinsicElements.g)({
    id: "SVGRepo_iconCarrier",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.path, __VLS_intrinsicElements.path)({
    d: "M14 2.26953V6.40007C14 6.96012 14 7.24015 14.109 7.45406C14.2049 7.64222 14.3578 7.7952 14.546 7.89108C14.7599 8.00007 15.0399 8.00007 15.6 8.00007H19.7305M16 13H8M16 17H8M10 9H8M14 2H8.8C7.11984 2 6.27976 2 5.63803 2.32698C5.07354 2.6146 4.6146 3.07354 4.32698 3.63803C4 4.27976 4 5.11984 4 6.8V17.2C4 18.8802 4 19.7202 4.32698 20.362C4.6146 20.9265 5.07354 21.3854 5.63803 21.673C6.27976 22 7.11984 22 8.8 22H15.2C16.8802 22 17.7202 22 18.362 21.673C18.9265 21.3854 19.3854 20.9265 19.673 20.362C20 19.7202 20 18.8802 20 17.2V8L14 2Z",
    stroke: "#ffffff",
    'stroke-width': "2",
    'stroke-linecap': "round",
    'stroke-linejoin': "round",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(Object.assign({ class: "px-2 text-white text-2xl ml-2 text-center" }, { class: ({ 'hidden': !__VLS_ctx.sideExpanded }) }));
var __VLS_3;
const __VLS_4 = {}.RouterLink;
/** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4(Object.assign(Object.assign(Object.assign({ to: "/" }, { class: "relative mb-2 flex p-3 hover:bg-gradient-to-r from-indigo-600 to-cyan-500 rounded-4xl items-center" }), { class: ({ 'w-48': __VLS_ctx.sideExpanded }) }), { activeClass: "bg-slate-900" })));
const __VLS_6 = __VLS_5(Object.assign(Object.assign(Object.assign({ to: "/" }, { class: "relative mb-2 flex p-3 hover:bg-gradient-to-r from-indigo-600 to-cyan-500 rounded-4xl items-center" }), { class: ({ 'w-48': __VLS_ctx.sideExpanded }) }), { activeClass: "bg-slate-900" }), ...__VLS_functionalComponentArgsRest(__VLS_5));
__VLS_7.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)(Object.assign({ class: "w-9 min-w-9" }, { fill: "#ffffff", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 100 100", 'enable-background': "new 0 0 100 100", 'xml:space': "preserve", stroke: "#ffffff" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.g, __VLS_intrinsicElements.g)({
    id: "SVGRepo_bgCarrier",
    'stroke-width': "0",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.g, __VLS_intrinsicElements.g)({
    id: "SVGRepo_tracerCarrier",
    'stroke-linecap': "round",
    'stroke-linejoin': "round",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.g, __VLS_intrinsicElements.g)({
    id: "SVGRepo_iconCarrier",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.path, __VLS_intrinsicElements.path)({
    d: "M61.8,29.4l8.9,8.9l0,0c2,1.9,2,5.1,0,7l0,0L47.5,68.4V36.6l7.2-7.2C56.6,27.4,59.9,27.4,61.8,29.4z M80,62.5V75c0,2.8-2.2,5-5,5H43.8l22.5-22.5H75C77.8,57.5,80,59.8,80,62.5z M20,68.8V25c0-2.8,2.2-5,5-5h12.5c2.8,0,5,2.2,5,5v43.8 c0,6.2-5,11.2-11.2,11.2S20,75,20,68.8z M31.2,73.8c2.8,0,5-2.2,5-5s-2.2-5-5-5s-5,2.2-5,5S28.5,73.8,31.2,73.8z",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(Object.assign({ class: "px-2 text-white text-2xl ml-2 text-center" }, { class: ({ 'hidden': !__VLS_ctx.sideExpanded }) }));
var __VLS_7;
const __VLS_8 = {}.RouterLink;
/** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8(Object.assign(Object.assign(Object.assign({ to: "/templates" }, { class: "relative mb-2 flex p-3 rounded-4xl hover:bg-gradient-to-r from-indigo-600 to-cyan-500  items-center" }), { class: ({ 'w-48': __VLS_ctx.sideExpanded }) }), { activeClass: "bg-slate-900" })));
const __VLS_10 = __VLS_9(Object.assign(Object.assign(Object.assign({ to: "/templates" }, { class: "relative mb-2 flex p-3 rounded-4xl hover:bg-gradient-to-r from-indigo-600 to-cyan-500  items-center" }), { class: ({ 'w-48': __VLS_ctx.sideExpanded }) }), { activeClass: "bg-slate-900" }), ...__VLS_functionalComponentArgsRest(__VLS_9));
__VLS_11.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)(Object.assign({ class: "w-9 min-w-9" }, { fill: "#000000", viewBox: "0 0 24 24", id: "file-code-3", 'data-name': "Line Color", xmlns: "http://www.w3.org/2000/svg" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.g, __VLS_intrinsicElements.g)({
    id: "SVGRepo_bgCarrier",
    'stroke-width': "0",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.g, __VLS_intrinsicElements.g)({
    id: "SVGRepo_tracerCarrier",
    'stroke-linecap': "round",
    'stroke-linejoin': "round",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.g, __VLS_intrinsicElements.g)({
    id: "SVGRepo_iconCarrier",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.polyline, __VLS_intrinsicElements.polyline)(Object.assign({ id: "secondary", points: "19 21 21 19 19 17" }, { style: {} }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.polyline, __VLS_intrinsicElements.polyline)(Object.assign({ id: "secondary-2", 'data-name': "secondary", points: "15 17 13 19 15 21" }, { style: {} }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.path, __VLS_intrinsicElements.path)(Object.assign({ id: "secondary-3", 'data-name': "secondary", d: "M7,13h6M7,9h6" }, { style: {} }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.path, __VLS_intrinsicElements.path)(Object.assign({ id: "primary", d: "M9,21H4a1,1,0,0,1-1-1V4A1,1,0,0,1,4,3H15l2,2v8" }, { style: {} }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.polygon, __VLS_intrinsicElements.polygon)(Object.assign({ id: "primary-2", 'data-name': "primary", points: "15 3 15 5 17 5 15 3" }, { style: {} }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(Object.assign({ class: "px-2 text-white text-2xl ml-2 text-center" }, { class: ({ 'hidden': !__VLS_ctx.sideExpanded }) }));
var __VLS_11;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "w-46 bg-neutral-950 rounded-b-2xl transition-all delay-0 ease-in-out fixed right-0 mt-[68px] flex flex-col border dark:border-neutral-800 border-t-0 z-50" }, { class: ({ 'h-[0px] delay-150 duration-650 border-b-0': !__VLS_ctx.navExpanded, 'h-[244px] delay-0 duration-500': __VLS_ctx.navExpanded }) }));
const __VLS_12 = {}.RouterLink;
/** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ]} */ ;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12(Object.assign(Object.assign(Object.assign({ to: "/login" }, { class: "transition-opacity text-white text-center p-4 text-xl hover:bg-slate-900" }), { activeClass: "bg-slate-800" }), { class: ({ 'opacity-0 delay-300': !__VLS_ctx.navExpanded, 'h-[244px] delay-30': __VLS_ctx.navExpanded }) })));
const __VLS_14 = __VLS_13(Object.assign(Object.assign(Object.assign({ to: "/login" }, { class: "transition-opacity text-white text-center p-4 text-xl hover:bg-slate-900" }), { activeClass: "bg-slate-800" }), { class: ({ 'opacity-0 delay-300': !__VLS_ctx.navExpanded, 'h-[244px] delay-30': __VLS_ctx.navExpanded }) }), ...__VLS_functionalComponentArgsRest(__VLS_13));
__VLS_15.slots.default;
var __VLS_15;
const __VLS_16 = {}.RouterLink;
/** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ]} */ ;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16(Object.assign(Object.assign(Object.assign({ to: "/notifications" }, { class: "transition-opacity text-white text-center p-4 text-xl hover:bg-slate-900" }), { activeClass: "bg-slate-800" }), { class: ({ 'opacity-0 delay-200': !__VLS_ctx.navExpanded, 'h-[244px] delay-150': __VLS_ctx.navExpanded }) })));
const __VLS_18 = __VLS_17(Object.assign(Object.assign(Object.assign({ to: "/notifications" }, { class: "transition-opacity text-white text-center p-4 text-xl hover:bg-slate-900" }), { activeClass: "bg-slate-800" }), { class: ({ 'opacity-0 delay-200': !__VLS_ctx.navExpanded, 'h-[244px] delay-150': __VLS_ctx.navExpanded }) }), ...__VLS_functionalComponentArgsRest(__VLS_17));
__VLS_19.slots.default;
var __VLS_19;
const __VLS_20 = {}.RouterLink;
/** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ]} */ ;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20(Object.assign(Object.assign(Object.assign({ to: "/login" }, { class: "transition-opacity  text-white text-center p-4 text-xl hover:bg-slate-900" }), { activeClass: "bg-slate-800" }), { class: ({ 'opacity-0 delay-100': !__VLS_ctx.navExpanded, 'h-[244px] delay-300': __VLS_ctx.navExpanded }) })));
const __VLS_22 = __VLS_21(Object.assign(Object.assign(Object.assign({ to: "/login" }, { class: "transition-opacity  text-white text-center p-4 text-xl hover:bg-slate-900" }), { activeClass: "bg-slate-800" }), { class: ({ 'opacity-0 delay-100': !__VLS_ctx.navExpanded, 'h-[244px] delay-300': __VLS_ctx.navExpanded }) }), ...__VLS_functionalComponentArgsRest(__VLS_21));
__VLS_23.slots.default;
var __VLS_23;
const __VLS_24 = {}.RouterLink;
/** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ]} */ ;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24(Object.assign(Object.assign(Object.assign({ to: "/login" }, { class: "rounded-b-2xl transition-opacity text-white text-center p-4 pb-5 text-xl hover:bg-slate-900 z-2" }), { activeClass: "bg-slate-800" }), { class: ({ 'opacity-0 delay-0': !__VLS_ctx.navExpanded, 'h-[244px] delay-450': __VLS_ctx.navExpanded }) })));
const __VLS_26 = __VLS_25(Object.assign(Object.assign(Object.assign({ to: "/login" }, { class: "rounded-b-2xl transition-opacity text-white text-center p-4 pb-5 text-xl hover:bg-slate-900 z-2" }), { activeClass: "bg-slate-800" }), { class: ({ 'opacity-0 delay-0': !__VLS_ctx.navExpanded, 'h-[244px] delay-450': __VLS_ctx.navExpanded }) }), ...__VLS_functionalComponentArgsRest(__VLS_25));
__VLS_27.slots.default;
var __VLS_27;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "flex grow" }));
const __VLS_28 = {}.RouterView;
/** @type {[typeof __VLS_components.RouterView, ]} */ ;
// @ts-ignore
const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({}));
const __VLS_30 = __VLS_29({}, ...__VLS_functionalComponentArgsRest(__VLS_29));
__VLS_asFunctionalElement(__VLS_intrinsicElements.br, __VLS_intrinsicElements.br)({});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['h-screen']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['h-17']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gradient-to-l']} */ ;
/** @type {__VLS_StyleScopedClasses['from-neutral-950']} */ ;
/** @type {__VLS_StyleScopedClasses['to-slate-800']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['fixed']} */ ;
/** @type {__VLS_StyleScopedClasses['top-0']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-end']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-tl-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-br-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gradient-to-r']} */ ;
/** @type {__VLS_StyleScopedClasses['from-indigo-600']} */ ;
/** @type {__VLS_StyleScopedClasses['to-cyan-500']} */ ;
/** @type {__VLS_StyleScopedClasses['size-12']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-15']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-300']} */ ;
/** @type {__VLS_StyleScopedClasses['ease-in-out']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:shadow-[0px_0px_10px_2px_rgba(255,_255,_255,_0.2)]']} */ ;
/** @type {__VLS_StyleScopedClasses['peer']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-neutral-950']} */ ;
/** @type {__VLS_StyleScopedClasses['w-21']} */ ;
/** @type {__VLS_StyleScopedClasses['h-[68px]']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-tr-3xl']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['text-3xl']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
/** @type {__VLS_StyleScopedClasses['ease-in-out']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-4xl']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:shadow-[13px_16px_0px_1px_rgba(0,_0,_0,_0.5)]']} */ ;
/** @type {__VLS_StyleScopedClasses['fixed']} */ ;
/** @type {__VLS_StyleScopedClasses['top-0']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['fixed']} */ ;
/** @type {__VLS_StyleScopedClasses['h-full']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-[68px]']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-none']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
/** @type {__VLS_StyleScopedClasses['ease-in-out']} */ ;
/** @type {__VLS_StyleScopedClasses['peer-hover:shadow-[13px_18px_0px_1px_rgba(0,_0,_0,_0.5)]']} */ ;
/** @type {__VLS_StyleScopedClasses['w-21']} */ ;
/** @type {__VLS_StyleScopedClasses['w-54']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-tr-3xl']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['w-19']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-shrink-0']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-y-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gradient-to-b']} */ ;
/** @type {__VLS_StyleScopedClasses['from-neutral-950']} */ ;
/** @type {__VLS_StyleScopedClasses['to-slate-800']} */ ;
/** @type {__VLS_StyleScopedClasses['p-3']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['p-3']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-4xl']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-gradient-to-r']} */ ;
/** @type {__VLS_StyleScopedClasses['from-indigo-600']} */ ;
/** @type {__VLS_StyleScopedClasses['to-cyan-500']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['w-48']} */ ;
/** @type {__VLS_StyleScopedClasses['w-9']} */ ;
/** @type {__VLS_StyleScopedClasses['min-w-9']} */ ;
/** @type {__VLS_StyleScopedClasses['px-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['ml-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['p-3']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-gradient-to-r']} */ ;
/** @type {__VLS_StyleScopedClasses['from-indigo-600']} */ ;
/** @type {__VLS_StyleScopedClasses['to-cyan-500']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-4xl']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['w-48']} */ ;
/** @type {__VLS_StyleScopedClasses['w-9']} */ ;
/** @type {__VLS_StyleScopedClasses['min-w-9']} */ ;
/** @type {__VLS_StyleScopedClasses['px-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['ml-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['p-3']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-4xl']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-gradient-to-r']} */ ;
/** @type {__VLS_StyleScopedClasses['from-indigo-600']} */ ;
/** @type {__VLS_StyleScopedClasses['to-cyan-500']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['w-48']} */ ;
/** @type {__VLS_StyleScopedClasses['w-9']} */ ;
/** @type {__VLS_StyleScopedClasses['min-w-9']} */ ;
/** @type {__VLS_StyleScopedClasses['px-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['ml-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['w-46']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-neutral-950']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-b-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['delay-0']} */ ;
/** @type {__VLS_StyleScopedClasses['ease-in-out']} */ ;
/** @type {__VLS_StyleScopedClasses['fixed']} */ ;
/** @type {__VLS_StyleScopedClasses['right-0']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-[68px]']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:border-neutral-800']} */ ;
/** @type {__VLS_StyleScopedClasses['border-t-0']} */ ;
/** @type {__VLS_StyleScopedClasses['z-50']} */ ;
/** @type {__VLS_StyleScopedClasses['h-[0px]']} */ ;
/** @type {__VLS_StyleScopedClasses['delay-150']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-650']} */ ;
/** @type {__VLS_StyleScopedClasses['border-b-0']} */ ;
/** @type {__VLS_StyleScopedClasses['h-[244px]']} */ ;
/** @type {__VLS_StyleScopedClasses['delay-0']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-500']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-opacity']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-slate-900']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-0']} */ ;
/** @type {__VLS_StyleScopedClasses['delay-300']} */ ;
/** @type {__VLS_StyleScopedClasses['h-[244px]']} */ ;
/** @type {__VLS_StyleScopedClasses['delay-30']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-opacity']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-slate-900']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-0']} */ ;
/** @type {__VLS_StyleScopedClasses['delay-200']} */ ;
/** @type {__VLS_StyleScopedClasses['h-[244px]']} */ ;
/** @type {__VLS_StyleScopedClasses['delay-150']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-opacity']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-slate-900']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-0']} */ ;
/** @type {__VLS_StyleScopedClasses['delay-100']} */ ;
/** @type {__VLS_StyleScopedClasses['h-[244px]']} */ ;
/** @type {__VLS_StyleScopedClasses['delay-300']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-b-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-opacity']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['pb-5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-slate-900']} */ ;
/** @type {__VLS_StyleScopedClasses['z-2']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-0']} */ ;
/** @type {__VLS_StyleScopedClasses['delay-0']} */ ;
/** @type {__VLS_StyleScopedClasses['h-[244px]']} */ ;
/** @type {__VLS_StyleScopedClasses['delay-450']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['grow']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            RouterLink: RouterLink,
            RouterView: RouterView,
            sideExpanded: sideExpanded,
            ToggleSidenav: ToggleSidenav,
            navExpanded: navExpanded,
            ToggleNav: ToggleNav,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
