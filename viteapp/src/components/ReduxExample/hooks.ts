// 文件定义了两个自定义 Hook，方便组件在 Redux 中派发动作和读取状态。

// Imports typed React-Redux helpers to customize selector and dispatch hooks.
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
// 从 react-redux 引入了 useDispatch 和 useSelector 这两个标准 Hook，并额、外拿到一个类型辅助 TypedUseSelectorHook，待会儿配合 TypeScript 做类型约束。

// Imports the store's dispatch and state types for type-safe bindings.
import type { AppDispatch, RootState } from "./store";
// 从项目自己的 ./store 中导入 AppDispatch 和 RootState 类型：前者描述了 store 的 dispatch 函数长什么样，后者描述了整个 Redux 状态树的结构。

// Exposes a dispatch hook that is aware of the AppDispatch signature.
export const useAppDispatch = () => useDispatch<AppDispatch>();
// useAppDispatch 是一个简单的封装，调用 useDispatch<AppDispatch>()，这样以后组件里用它派发动作时就能获得正确的 TypeScript 推断（比如有哪些 thunk 可以调）。

// Exposes a selector hook that is aware of the RootState structure.
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
// useAppSelector 则是把默认的 useSelector 赋值给一个带类型的版本；通过 TypedUseSelectorHook<RootState> 告诉 TypeScript“这个 selector 看到的状态就是我们 store 里的 RootState”，组件里再写 useAppSelector(state => state.slice) 时就能自动获得字段提示和类型校验。
