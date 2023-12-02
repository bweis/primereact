import * as React from 'react';
import { ariaLabel } from '../api/Api';
import { Button } from '../button/Button';
import { AngleDoubleDownIcon } from '../icons/angledoubledown';
import { AngleDoubleUpIcon } from '../icons/angledoubleup';
import { AngleDownIcon } from '../icons/angledown';
import { AngleUpIcon } from '../icons/angleup';
import { ObjectUtils, useMergeProps } from '../utils/Utils';

export const OrderListControls = React.memo((props) => {
    const mergeProps = useMergeProps();
    const moveUpIcon = props.moveUpIcon || <AngleUpIcon />;
    const moveTopIcon = props.moveTopIcon || <AngleDoubleUpIcon />;
    const moveDownIcon = props.moveDownIcon || <AngleDownIcon />;
    const moveBottomIcon = props.moveBottomIcon || <AngleDoubleDownIcon />;
    const { ptm, cx, unstyled } = props;

    const moveUp = (event) => {
        if (props.selection) {
            let value = [...props.value];

            for (let i = 0; i < props.selection.length; i++) {
                const selectedItem = props.selection[i];
                const selectedItemIndex = ObjectUtils.findIndexInList(selectedItem, value, props.dataKey);

                if (selectedItemIndex !== 0) {
                    const movedItem = value[selectedItemIndex];
                    const temp = value[selectedItemIndex - 1];

                    value[selectedItemIndex - 1] = movedItem;
                    value[selectedItemIndex] = temp;
                } else {
                    break;
                }
            }

            if (props.onReorder) {
                props.onReorder({
                    originalEvent: event,
                    value: value,
                    direction: 'up'
                });
            }
        }
    };

    const moveTop = (event) => {
        if (props.selection) {
            let value = [...props.value];

            for (let i = props.selection.length - 1; i >= 0; i--) {
                const selectedItem = props.selection[i];
                const selectedItemIndex = ObjectUtils.findIndexInList(selectedItem, value, props.dataKey);

                if (selectedItemIndex !== 0) {
                    const movedItem = value.splice(selectedItemIndex, 1)[0];

                    value.unshift(movedItem);
                } else {
                    break;
                }
            }

            if (props.onReorder) {
                props.onReorder({
                    originalEvent: event,
                    value: value,
                    direction: 'top'
                });
            }
        }
    };

    const moveDown = (event) => {
        if (props.selection) {
            let value = [...props.value];

            for (let i = props.selection.length - 1; i >= 0; i--) {
                const selectedItem = props.selection[i];
                const selectedItemIndex = ObjectUtils.findIndexInList(selectedItem, value, props.dataKey);

                if (selectedItemIndex !== value.length - 1) {
                    const movedItem = value[selectedItemIndex];
                    const temp = value[selectedItemIndex + 1];

                    value[selectedItemIndex + 1] = movedItem;
                    value[selectedItemIndex] = temp;
                } else {
                    break;
                }
            }

            if (props.onReorder) {
                props.onReorder({
                    originalEvent: event,
                    value,
                    direction: 'down'
                });
            }
        }
    };

    const moveBottom = (event) => {
        if (props.selection) {
            let value = [...props.value];

            for (let i = 0; i < props.selection.length; i++) {
                let selectedItem = props.selection[i];
                let selectedItemIndex = ObjectUtils.findIndexInList(selectedItem, value, props.dataKey);

                if (selectedItemIndex !== value.length - 1) {
                    const movedItem = value.splice(selectedItemIndex, 1)[0];

                    value.push(movedItem);
                } else {
                    break;
                }
            }

            if (props.onReorder) {
                props.onReorder({
                    originalEvent: event,
                    value,
                    direction: 'bottom'
                });
            }
        }
    };

    const controlsProps = mergeProps(
        {
            className: cx('controls')
        },
        ptm('controls', { hostName: props.hostName })
    );

    const moveUpButtonProps = mergeProps(
        {
            type: 'button',
            unstyled: unstyled,
            icon: moveUpIcon,
            onClick: moveUp,
            'aria-label': ariaLabel('moveUp'),
            __parentMetadata: {
                parent: props.metaData
            }
        },
        ptm('moveUpButton')
    );

    const moveTopButtonProps = mergeProps(
        {
            type: 'button',
            unstyled: unstyled,
            icon: moveTopIcon,
            onClick: moveTop,
            'aria-label': ariaLabel('moveTop'),
            __parentMetadata: {
                parent: props.metaData
            }
        },
        ptm('moveTopButton')
    );

    const moveDownButtonProps = mergeProps(
        {
            type: 'button',
            unstyled: unstyled,
            icon: moveDownIcon,
            onClick: moveDown,
            'aria-label': ariaLabel('moveDown'),
            __parentMetadata: {
                parent: props.metaData
            }
        },
        ptm('moveDownButton')
    );

    const moveBottomButtonProps = mergeProps(
        {
            type: 'button',
            unstyled: unstyled,
            icon: moveBottomIcon,
            onClick: moveBottom,
            'aria-label': ariaLabel('moveBottom'),
            __parentMetadata: {
                parent: props.metaData
            }
        },
        ptm('moveBottomButton')
    );

    const isMoveDisabled = ObjectUtils.isEmpty(props.selection);

    return (
        <div {...controlsProps}>
            <Button pt={ptm('moveUpButton')} {...moveUpButtonProps} disabled={isMoveDisabled}></Button>
            <Button pt={ptm('moveTopButton')} {...moveTopButtonProps} disabled={isMoveDisabled}></Button>
            <Button pt={ptm('moveDownButton')} {...moveDownButtonProps} disabled={isMoveDisabled}></Button>
            <Button pt={ptm('moveBottomButton')} {...moveBottomButtonProps} disabled={isMoveDisabled}></Button>
        </div>
    );
});

OrderListControls.displayName = 'OrderListControls';
