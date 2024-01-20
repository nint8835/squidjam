module Squidjam.Game.Actions

open System
open System.Security.Cryptography

type Action =
    | EndTurn of Player
    | AddPlayer of Player
    | Ready of Player

let endTurn (game: Game) (player: Player) : Result<Game, string> =
    match game.state with
    | PlayerTurn playerIndex ->
        if GameUtils.GetPlayerIndex game player.id = playerIndex then
            Ok { game with state = PlayerTurn((playerIndex + 1) % game.players.Length) }
        else
            Error "You cannot end the turn when it is not your turn"
    | _ -> Error $"Unable to end turn in game state %s{game.state.GetType().Name}"

let addPlayer (game: Game) (player: Player) : Result<Game, string> =
    if game.state <> PlayerRegistration then
        Error $"Unable to add player in game state %s{game.state.GetType().Name}"
    else
        let playerSeed =
            MD5
                .Create()
                .ComputeHash(
                    game.id.ToByteArray()
                    |> Array.append (player.id.ToByteArray())
                )
            |> BitConverter.ToInt32

        let random = Random(playerSeed)

        let newPlayerArray = Array.append game.players [| player |]

        random.Shuffle newPlayerArray

        Ok { game with players = newPlayerArray }

let ready (game: Game) (player: Player) : Result<Game, string> =
    if game.state <> PlayerRegistration then
        Error $"Unable to ready player in game state %s{game.state.GetType().Name}"
    else
        let updatedGame = GameUtils.UpdatePlayer game player.id (fun p -> { p with ready = true })
        
        if updatedGame.players |> Array.forall (_.ready) && updatedGame.players.Length > 1 then
            Ok { updatedGame with state = PlayerTurn 0 }
        else
            Ok updatedGame


let Apply (game: Game) (action: Action) : Result<Game, string> =
    match action with
    | EndTurn player -> endTurn game player
    | AddPlayer player -> addPlayer game player
    | Ready player -> ready game player
