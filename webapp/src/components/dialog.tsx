// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
import React from 'react'
import {useIntl} from 'react-intl'
import {useHotkeys} from 'react-hotkeys-hook'

import IconButton from '../widgets/buttons/iconButton'
import CloseIcon from '../widgets/icons/close'
import OptionsIcon from '../widgets/icons/options'
import MenuWrapper from '../widgets/menuWrapper'
import './dialog.scss'

type Props = {
    children: React.ReactNode
    toolsMenu?: React.ReactNode // some dialogs may not  require a toolmenu
    hideCloseButton?: boolean
    className?: string
    onClose: () => void,
}

const Dialog = React.memo((props: Props) => {
    const {toolsMenu} = props
    const intl = useIntl()

    const closeDialogText = intl.formatMessage({
        id: 'Dialog.closeDialog',
        defaultMessage: 'Close dialog',
    })

    useHotkeys('esc', () => props.onClose())

    return (
        <div className={`Dialog dialog-back ${props.className}`}>
            <div
                className='wrapper'
                onClick={(e) => {
                    if (e.target === e.currentTarget) {
                        props.onClose()
                    }
                }}
            >
                <div className='dialog' >
                    <div className='toolbar'>
                        {
                            !props.hideCloseButton &&
                            <IconButton
                                onClick={props.onClose}
                                icon={<CloseIcon/>}
                                title={closeDialogText}
                                className='IconButton--large'
                            />
                        }
                        {toolsMenu && <MenuWrapper>
                            <IconButton
                                className='IconButton--large'
                                icon={<OptionsIcon/>}
                            />
                            {toolsMenu}
                        </MenuWrapper>
                        }
                    </div>
                    {props.children}
                </div>
            </div>
        </div>
    )
})

export default Dialog
