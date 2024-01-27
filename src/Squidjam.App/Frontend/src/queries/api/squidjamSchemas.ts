/**
 * Generated by @openapi-codegen
 *
 * @version 1.0
 */
export type AddPlayer = {
    type: AddPlayerEnum;
    /**
     * @format uuid
     */
    player: string;
};

export type AddPlayerEnum = 'AddPlayer';

export type EndTurn = {
    type: EndTurnEnum;
    /**
     * @format uuid
     */
    player: string;
};

export type EndTurnEnum = 'EndTurn';

export type Ended = {
    type: EndedEnum;
    /**
     * @format uuid
     */
    winner: string | null;
};

export type EndedEnum = 'Ended';

export type Game = {
    /**
     * @format uuid
     */
    id: string;
    state: PlayerRegistration | PlayerTurn | Ended;
    players: Player[];
};

export type Grack = {
    type: GrackEnum;
};

export type GrackEnum = 'Grack';

export type Gump = {
    type: GumpEnum;
};

export type GumpEnum = 'Gump';

export type Player = {
    /**
     * @format uuid
     */
    id: string;
    ready: boolean;
    ['class']: Grack | Gump | null;
};

export type PlayerRegistration = {
    type: PlayerRegistrationEnum;
};

export type PlayerRegistrationEnum = 'PlayerRegistration';

export type PlayerTurn = {
    type: PlayerTurnEnum;
    /**
     * @format int32
     */
    playerIndex: number;
};

export type PlayerTurnEnum = 'PlayerTurn';

export type Ready = {
    type: ReadyEnum;
    /**
     * @format uuid
     */
    player: string;
};

export type ReadyEnum = 'Ready';

export type SelectClass = {
    type: SelectClassEnum;
    /**
     * @format uuid
     */
    player: string;
    ['class']: Grack | Gump;
};

export type SelectClassEnum = 'SelectClass';
