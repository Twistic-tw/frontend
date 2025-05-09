var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { RouterView } from 'vue-router';
import { useRoute } from 'vue-router';
const route = useRoute();
import NavUnlog from './Navs/NavUnlog.vue';
import NavAdmin from './Navs/NavAdmin.vue';
import { ref, onMounted, onUnmounted } from 'vue';
import './styles.css';
// Botón volvder arriba
const showButton = ref(false);
const handleScroll = () => { showButton.value = window.scrollY > 200; };
const scrollToTop = () => { window.scrollTo({ top: 0, behavior: 'smooth' }); };
onMounted(() => __awaiter(void 0, void 0, void 0, function* () {
    window.addEventListener('scroll', handleScroll);
}));
onUnmounted(() => window.removeEventListener('scroll', handleScroll));
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "min-h-screen flex flex-col bg-gradient-to-r from-white via-slate-200 to-slate-400 dark:from-neutral-950 dark:to-slate-900" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.header, __VLS_intrinsicElements.header)({});
if (__VLS_ctx.route.meta.requiereNavAdmin) {
    /** @type {[typeof NavAdmin, ]} */ ;
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(NavAdmin, new NavAdmin({}));
    const __VLS_1 = __VLS_0({}, ...__VLS_functionalComponentArgsRest(__VLS_0));
}
else {
    /** @type {[typeof NavUnlog, ]} */ ;
    // @ts-ignore
    const __VLS_3 = __VLS_asFunctionalComponent(NavUnlog, new NavUnlog({}));
    const __VLS_4 = __VLS_3({}, ...__VLS_functionalComponentArgsRest(__VLS_3));
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.main, __VLS_intrinsicElements.main)(Object.assign({ class: "flex-1 pt-14" }));
const __VLS_6 = {}.RouterView;
/** @type {[typeof __VLS_components.RouterView, typeof __VLS_components.RouterView, ]} */ ;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({}));
const __VLS_8 = __VLS_7({}, ...__VLS_functionalComponentArgsRest(__VLS_7));
{
    const { default: __VLS_thisSlot } = __VLS_9.slots;
    const [{ Component }] = __VLS_getSlotParams(__VLS_thisSlot);
    const __VLS_10 = {}.transition;
    /** @type {[typeof __VLS_components.Transition, typeof __VLS_components.transition, typeof __VLS_components.Transition, typeof __VLS_components.transition, ]} */ ;
    // @ts-ignore
    const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({
        enterActiveClass: "transition-all duration-500 ease-out",
        enterFromClass: "opacity-0 translate-y-4",
        enterToClass: "opacity-100 translate-y-0",
        leaveActiveClass: "transition-all duration-500 ease-in",
        leaveFromClass: "opacity-100 translate-y-0",
        leaveToClass: "opacity-0 translate-y-4",
        mode: "out-in",
    }));
    const __VLS_12 = __VLS_11({
        enterActiveClass: "transition-all duration-500 ease-out",
        enterFromClass: "opacity-0 translate-y-4",
        enterToClass: "opacity-100 translate-y-0",
        leaveActiveClass: "transition-all duration-500 ease-in",
        leaveFromClass: "opacity-100 translate-y-0",
        leaveToClass: "opacity-0 translate-y-4",
        mode: "out-in",
    }, ...__VLS_functionalComponentArgsRest(__VLS_11));
    __VLS_13.slots.default;
    const __VLS_14 = ((Component));
    // @ts-ignore
    const __VLS_15 = __VLS_asFunctionalComponent(__VLS_14, new __VLS_14({}));
    const __VLS_16 = __VLS_15({}, ...__VLS_functionalComponentArgsRest(__VLS_15));
    var __VLS_13;
    __VLS_9.slots['' /* empty slot name completion */];
}
var __VLS_9;
const __VLS_18 = {}.transition;
/** @type {[typeof __VLS_components.Transition, typeof __VLS_components.transition, typeof __VLS_components.Transition, typeof __VLS_components.transition, ]} */ ;
// @ts-ignore
const __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({
    name: "fade-up",
}));
const __VLS_20 = __VLS_19({
    name: "fade-up",
}, ...__VLS_functionalComponentArgsRest(__VLS_19));
__VLS_21.slots.default;
if (__VLS_ctx.showButton) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(Object.assign({ onClick: (__VLS_ctx.scrollToTop) }, { class: "\u0066\u0069\u0078\u0065\u0064\u0020\u0062\u006f\u0074\u0074\u006f\u006d\u002d\u0036\u0020\u0072\u0069\u0067\u0068\u0074\u002d\u0036\u0020\u0062\u0067\u002d\u0067\u0072\u0061\u0064\u0069\u0065\u006e\u0074\u002d\u0074\u006f\u002d\u0072\u0020\u0066\u0072\u006f\u006d\u002d\u0069\u006e\u0064\u0069\u0067\u006f\u002d\u0035\u0030\u0030\u0020\u0074\u006f\u002d\u0070\u0075\u0072\u0070\u006c\u0065\u002d\u0036\u0030\u0030\u0020\u0074\u0065\u0078\u0074\u002d\u0077\u0068\u0069\u0074\u0065\u0020\u0070\u002d\u0034\u0020\u0072\u006f\u0075\u006e\u0064\u0065\u0064\u002d\u0066\u0075\u006c\u006c\u0020\u0073\u0068\u0061\u0064\u006f\u0077\u002d\u0032\u0078\u006c\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0068\u006f\u0076\u0065\u0072\u003a\u0066\u0072\u006f\u006d\u002d\u0069\u006e\u0064\u0069\u0067\u006f\u002d\u0036\u0030\u0030\u0020\u0068\u006f\u0076\u0065\u0072\u003a\u0074\u006f\u002d\u0070\u0075\u0072\u0070\u006c\u0065\u002d\u0037\u0030\u0030\u0020\u0068\u006f\u0076\u0065\u0072\u003a\u0073\u0068\u0061\u0064\u006f\u0077\u002d\u005b\u0030\u005f\u0030\u005f\u0032\u0030\u0070\u0078\u005f\u0072\u0067\u0062\u0061\u0028\u0037\u0039\u002c\u0035\u0037\u002c\u0032\u0034\u0036\u002c\u0030\u002e\u0036\u0029\u005d\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0074\u0072\u0061\u006e\u0073\u0069\u0074\u0069\u006f\u006e\u002d\u0074\u0072\u0061\u006e\u0073\u0066\u006f\u0072\u006d\u0020\u0064\u0075\u0072\u0061\u0074\u0069\u006f\u006e\u002d\u0035\u0030\u0030\u0020\u0065\u0061\u0073\u0065\u002d\u0069\u006e\u002d\u006f\u0075\u0074\u0020\u0074\u0072\u0061\u006e\u0073\u0066\u006f\u0072\u006d\u0020\u0068\u006f\u0076\u0065\u0072\u003a\u0073\u0063\u0061\u006c\u0065\u002d\u0031\u0031\u0030\u0020\u007a\u002d\u0035\u0030" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)(Object.assign(Object.assign({ xmlns: "http://www.w3.org/2000/svg" }, { class: "h-6 w-6" }), { fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", 'stroke-width': "2" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.path)({
        'stroke-linecap': "round",
        'stroke-linejoin': "round",
        d: "M5 15l7-7 7 7",
    });
}
var __VLS_21;
/** @type {__VLS_StyleScopedClasses['min-h-screen']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gradient-to-r']} */ ;
/** @type {__VLS_StyleScopedClasses['from-white']} */ ;
/** @type {__VLS_StyleScopedClasses['via-slate-200']} */ ;
/** @type {__VLS_StyleScopedClasses['to-slate-400']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:from-neutral-950']} */ ;
/** @type {__VLS_StyleScopedClasses['dark:to-slate-900']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['pt-14']} */ ;
/** @type {__VLS_StyleScopedClasses['fixed']} */ ;
/** @type {__VLS_StyleScopedClasses['bottom-6']} */ ;
/** @type {__VLS_StyleScopedClasses['right-6']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gradient-to-r']} */ ;
/** @type {__VLS_StyleScopedClasses['from-indigo-500']} */ ;
/** @type {__VLS_StyleScopedClasses['to-purple-600']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:from-indigo-600']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:to-purple-700']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:shadow-[0_0_20px_rgba(79,57,246,0.6)]']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-transform']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-500']} */ ;
/** @type {__VLS_StyleScopedClasses['ease-in-out']} */ ;
/** @type {__VLS_StyleScopedClasses['transform']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:scale-110']} */ ;
/** @type {__VLS_StyleScopedClasses['z-50']} */ ;
/** @type {__VLS_StyleScopedClasses['h-6']} */ ;
/** @type {__VLS_StyleScopedClasses['w-6']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            RouterView: RouterView,
            route: route,
            NavUnlog: NavUnlog,
            NavAdmin: NavAdmin,
            showButton: showButton,
            scrollToTop: scrollToTop,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
