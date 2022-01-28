import { DependencyList, EffectCallback, useEffect } from 'react';

/*
 * @Description: 自定义的hooks
 * @Author: xi_zi
 * @Date: 2022-01-27 17:20:29
 * @LastEditTime: 2022-01-27 17:21:32
 * @LastEditors: xi_zi
 */
export const useMounted = (effect: EffectCallback, deps: DependencyList = []) => {
  return useEffect(effect, deps);
};
