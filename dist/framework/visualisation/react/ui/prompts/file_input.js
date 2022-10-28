var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from 'react';
import TextBundle from '../../../../text_bundle';
import { Translator } from '../../../../translator';
import { PrimaryButton } from '../elements/button';
export var FileInput = function (props) {
    var _a = React.useState(), selectedFile = _a[0], setSelectedFile = _a[1];
    var _b = React.useState(true), confirmHidden = _b[0], setConfirmHidden = _b[1];
    var input = React.useRef(null);
    var resolve = props.resolve;
    var _c = prepareCopy(props), title = _c.title, description = _c.description, extensions = _c.extensions, selectButton = _c.selectButton, continueButton = _c.continueButton;
    function handleClick() {
        var _a;
        (_a = input.current) === null || _a === void 0 ? void 0 : _a.click();
    }
    function handleSelect(event) {
        var files = event.target.files;
        if (files != null && files.length > 0) {
            setSelectedFile(files[0]);
            setConfirmHidden(false);
        }
        else {
            console.log('[FileInput] Error selecting file: ' + JSON.stringify(files));
        }
    }
    function handleConfirm() {
        if (selectedFile !== undefined) {
            resolve === null || resolve === void 0 ? void 0 : resolve({ __type__: 'PayloadFile', value: selectedFile });
        }
    }
    return (_jsxs(_Fragment, { children: [_jsx("div", __assign({ className: 'text-title5 font-title5 sm:text-title4 sm:font-title4 lg:text-title3 lg:font-title3 text-grey1' }, { children: title })), _jsx("div", { className: 'mt-8' }), _jsxs("div", __assign({ id: 'select-panel' }, { children: [_jsx("div", __assign({ className: 'flex-wrap text-bodylarge font-body text-grey1 text-left' }, { children: description })), _jsx("div", { className: 'mt-4' }), _jsxs("div", __assign({ className: 'flex flex-row items-center gap-4' }, { children: [_jsx("div", __assign({ className: 'flex-wrap cursor-pointer' }, { children: _jsx("div", __assign({ id: 'select-button', className: 'pt-15px pb-15px active:shadow-top4px active:pt-4 active:pb-14px leading-none font-button text-button rounded pr-4 pl-4 bg-primary text-white', onClick: handleClick }, { children: selectButton })) })), _jsx("div", __assign({ className: 'flex-wrap' }, { children: _jsx("div", __assign({ id: 'selected-filename', className: 'flex-wrap text-subhead font-subhead text-grey1' }, { children: selectedFile === null || selectedFile === void 0 ? void 0 : selectedFile.name })) }))] })), _jsx("input", { ref: input, id: 'input', type: 'file', className: 'hidden', accept: extensions, onChange: handleSelect })] })), _jsx("div", { className: 'mt-10' }), _jsx("div", __assign({ className: 'flex flex-row gap-4 items-center' }, { children: _jsx("div", __assign({ className: confirmHidden ? 'hidden' : '' }, { children: _jsx(PrimaryButton, { label: continueButton, onClick: handleConfirm, color: 'bg-tertiary text-grey1' }) })) }))] }));
};
function prepareCopy(_a) {
    var title = _a.title, description = _a.description, extensions = _a.extensions, locale = _a.locale;
    return {
        title: Translator.translate(title, locale),
        description: Translator.translate(description, locale),
        extensions: extensions,
        selectButton: Translator.translate(selectButtonLabel(), locale),
        continueButton: Translator.translate(continueButtonLabel(), locale)
    };
}
var continueButtonLabel = function () {
    return new TextBundle()
        .add('en', 'Continue')
        .add('nl', 'Doorgaan');
};
var selectButtonLabel = function () {
    return new TextBundle()
        .add('en', 'Choose file')
        .add('nl', 'Kies bestand');
};
