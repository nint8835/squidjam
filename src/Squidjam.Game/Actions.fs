module Squidjam.Game.Actions

open System
open System.Security.Cryptography

type Action =
    | EndTurn
    | AddPlayer of Player

let endTurn (game: Game) : Result<Game, string> =
    match game.state with
    | PlayerTurn playerIndex -> Ok { game with state = PlayerTurn((playerIndex + 1) % game.players.Length) }
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

let Apply (game: Game) (action: Action) : Result<Game, string> =
    match action with
    | EndTurn -> endTurn game
    | AddPlayer player -> addPlayer game player
