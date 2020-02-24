import { Control, ControllerProps } from './types';
declare const Controller: <ControlProp extends Control<Record<string, any>> = Control<Record<string, any>>>({ name, rules, as: InnerComponent, onBlur, onChange, onChangeName, onBlurName, valueName, defaultValue, control, ...rest }: ControllerProps<ControlProp>) => JSX.Element;
export { Controller };
