// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
import React from 'react'
import {render, screen, within} from '@testing-library/react'
import '@testing-library/jest-dom'

import {Provider as ReduxProvider} from 'react-redux'

import userEvent from '@testing-library/user-event'

import {mocked} from 'ts-jest/utils'

import Mutator from '../../mutator'
import {Utils} from '../../utils'

import {TestBlockFactory} from '../../test/testBlockFactory'
import {IPropertyTemplate} from '../../blocks/board'
import {mockStateStore, wrapDNDIntl} from '../../testUtils'

import KanbanCard from './kanbanCard'

jest.mock('../../mutator')
jest.mock('../../utils')
jest.mock('../../telemetry/telemetryClient')
const mockedUtils = mocked(Utils, true)
const mockedMutator = mocked(Mutator, true)

describe('src/components/kanban/kanbanCard', () => {
    const board = TestBlockFactory.createBoard()
    const card = TestBlockFactory.createCard(board)
    const propertyTemplate: IPropertyTemplate = {
        id: 'id',
        name: 'name',
        type: 'text',
        options: [
            {
                color: 'propColorOrange',
                id: 'property_value_id_1',
                value: 'Q1',
            },
            {
                color: 'propColorBlue',
                id: 'property_value_id_2',
                value: 'Q2',
            },
        ],
    }
    const state = {
        cards: {
            cards: [card],
        },
        contents: {},
        comments: {
            comments: {},
        },
    }
    const store = mockStateStore([], state)
    beforeEach(jest.clearAllMocks)
    test('should match snapshot', () => {
        const {container} = render(wrapDNDIntl(
            <ReduxProvider store={store}>
                <KanbanCard
                    card={card}
                    board={board}
                    visiblePropertyTemplates={[propertyTemplate]}
                    isSelected={false}
                    readonly={false}
                    onDrop={jest.fn()}
                    showCard={jest.fn()}
                    isManualSort={false}
                />
            </ReduxProvider>,
        ))
        expect(container).toMatchSnapshot()
    })
    test('should match snapshot with readonly', () => {
        const {container} = render(wrapDNDIntl(
            <ReduxProvider store={store}>
                <KanbanCard
                    card={card}
                    board={board}
                    visiblePropertyTemplates={[propertyTemplate]}
                    isSelected={false}
                    readonly={true}
                    onDrop={jest.fn()}
                    showCard={jest.fn()}
                    isManualSort={false}
                />
            </ReduxProvider>,
        ))
        expect(container).toMatchSnapshot()
    })
    test('return kanbanCard and click on delete menu ', () => {
        const {container} = render(wrapDNDIntl(
            <ReduxProvider store={store}>
                <KanbanCard
                    card={card}
                    board={board}
                    visiblePropertyTemplates={[propertyTemplate]}
                    isSelected={false}
                    readonly={false}
                    onDrop={jest.fn()}
                    showCard={jest.fn()}
                    isManualSort={false}
                />
            </ReduxProvider>,
        ))
        const elementMenuWrapper = screen.getByRole('button', {name: 'menuwrapper'})
        expect(elementMenuWrapper).not.toBeNull()
        userEvent.click(elementMenuWrapper)
        expect(container).toMatchSnapshot()
        const elementButtonDelete = within(elementMenuWrapper).getByRole('button', {name: 'Delete'})
        expect(elementButtonDelete).not.toBeNull()
        userEvent.click(elementButtonDelete)
        expect(mockedMutator.deleteBlock).toBeCalledWith(card, 'delete card')
    })
    test('return kanbanCard and click on duplicate menu ', () => {
        const {container} = render(wrapDNDIntl(
            <ReduxProvider store={store}>
                <KanbanCard
                    card={card}
                    board={board}
                    visiblePropertyTemplates={[propertyTemplate]}
                    isSelected={false}
                    readonly={false}
                    onDrop={jest.fn()}
                    showCard={jest.fn()}
                    isManualSort={false}
                />
            </ReduxProvider>,
        ))
        const elementMenuWrapper = screen.getByRole('button', {name: 'menuwrapper'})
        expect(elementMenuWrapper).not.toBeNull()
        userEvent.click(elementMenuWrapper)
        expect(container).toMatchSnapshot()
        const elementButtonDuplicate = within(elementMenuWrapper).getByRole('button', {name: 'Duplicate'})
        expect(elementButtonDuplicate).not.toBeNull()
        userEvent.click(elementButtonDuplicate)
        expect(mockedMutator.duplicateCard).toBeCalledTimes(1)
    })

    test('return kanbanCard and click on copy link menu ', () => {
        const {container} = render(wrapDNDIntl(
            <ReduxProvider store={store}>
                <KanbanCard
                    card={card}
                    board={board}
                    visiblePropertyTemplates={[propertyTemplate]}
                    isSelected={false}
                    readonly={false}
                    onDrop={jest.fn()}
                    showCard={jest.fn()}
                    isManualSort={false}
                />
            </ReduxProvider>,
        ))
        const elementMenuWrapper = screen.getByRole('button', {name: 'menuwrapper'})
        expect(elementMenuWrapper).not.toBeNull()
        userEvent.click(elementMenuWrapper)
        expect(container).toMatchSnapshot()
        const elementButtonCopyLink = within(elementMenuWrapper).getByRole('button', {name: 'Copy link'})
        expect(elementButtonCopyLink).not.toBeNull()
        userEvent.click(elementButtonCopyLink)
        expect(mockedUtils.copyTextToClipboard).toBeCalledTimes(1)
    })
})
