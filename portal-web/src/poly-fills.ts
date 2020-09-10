import Form, { FormProps, ThemeProps } from "@rjsf/core"
import React, { forwardRef } from "react"
import _extends from "@babel/runtime-corejs2/helpers/esm/extends"
import _objectSpread from "@babel/runtime-corejs2/helpers/esm/objectSpread"
import _objectWithoutProperties from "@babel/runtime-corejs2/helpers/esm/objectWithoutProperties"

export function portalWithTheme<T = any>(
  themeProps: ThemeProps<T>,
): React.ForwardRefExoticComponent<
  React.PropsWithoutRef<FormProps<T>> & React.RefAttributes<Form<T>>
> {
  return forwardRef((_ref, ref) => {
    let { fields } = _ref
    let { widgets } = _ref
    const directProps = _objectWithoutProperties(_ref, ["fields", "widgets"])

    fields = _objectSpread({}, themeProps.fields, fields)
    widgets = _objectSpread({}, themeProps.widgets, widgets)
    return React.createElement(
      Form,
      _extends({}, themeProps, directProps, {
        fields,
        widgets,
        ref,
      }),
    )
  })
}
