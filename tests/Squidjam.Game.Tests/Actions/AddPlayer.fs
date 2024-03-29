module Squidjam.Game.Tests.Actions.``Add Player``

open System
open NUnit.Framework

open Squidjam.Game

let invalidStates =
    [| Ended(None); PlayerTurn(0) |] |> Array.map (fun state -> TestCaseData(state))

[<Test>]
[<TestCaseSource("invalidStates")>]
let ``Invalid State`` (state: GameState) =
    let stateName = state.GetType().Name

    let initialGame =
        { Id = Guid.NewGuid()
          State = state
          Players = [||] }

    let game =
        Actions.Apply initialGame (Actions.AddPlayer(Guid.NewGuid(), Guid.NewGuid().ToString()))

    match game with
    | Ok g -> Assert.Fail($"Should not be able to add player in %s{stateName} state")
    | Error e -> Assert.AreEqual(e, $"Unable to add player in game state %s{stateName}")

[<Test>]
let ``Single Player`` () =
    let initialGame =
        { Id = Guid.NewGuid()
          State = PlayerRegistration
          Players = [||] }

    let newPlayer =
        { Id = Guid.NewGuid()
          Name = Guid.NewGuid().ToString()
          Ready = false
          Class = None
          Creatures = [||]
          RemainingEnergy = 1
          MaxEnergy = 1
          MutationDeck = [||]
          MutationHand = [||] }

    let game =
        Actions.Apply initialGame (Actions.AddPlayer(newPlayer.Id, newPlayer.Name))

    match game with
    | Ok g ->
        Assert.AreEqual(
            g,
            { initialGame with
                Players = [| newPlayer |] }
        )
    | Error e -> Assert.Fail(e)

[<Test>]
let ``Multiple Players Are Shuffled`` () =
    let initialGame =
        { Id = Guid("57aabc8c-b4a1-4e7a-9400-70be7e9315c2")
          State = PlayerRegistration
          Players = [||] }

    let player1 =
        { Id = Guid("01fa5247-91c6-4c8a-8f7b-3b4f7d5c6f6e")
          Name = "Player 1"
          Ready = false
          Class = None
          Creatures = [||]
          RemainingEnergy = 1
          MaxEnergy = 1
          MutationDeck = [||]
          MutationHand = [||] }

    let player2 =
        { Id = Guid("fc2d0e31-e2e1-4329-8d67-5bce12ea2d88")
          Name = "Player 2"
          Ready = false
          Class = None
          Creatures = [||]
          RemainingEnergy = 1
          MaxEnergy = 1
          MutationDeck = [||]
          MutationHand = [||] }

    let player3 =
        { Id = Guid("338a4db6-25d7-4910-80d7-98bf3b3ad31c")
          Name = "Player 3"
          Ready = false
          Class = None
          Creatures = [||]
          RemainingEnergy = 1
          MaxEnergy = 1
          MutationDeck = [||]
          MutationHand = [||] }

    let gameWith1Player =
        Actions.Apply initialGame (Actions.AddPlayer(player1.Id, player1.Name))

    match gameWith1Player with
    | Error e -> Assert.Fail(e)
    | Ok g1 ->
        Assert.AreEqual(g1.Players, [| player1 |])

        let gameWith2Players =
            Actions.Apply g1 (Actions.AddPlayer(player2.Id, player2.Name))

        match gameWith2Players with
        | Error e -> Assert.Fail(e)
        | Ok g2 ->
            Assert.AreEqual(g2.Players, [| player2; player1 |])

            let gameWith3Players =
                Actions.Apply g2 (Actions.AddPlayer(player3.Id, player3.Name))

            match gameWith3Players with
            | Error e -> Assert.Fail(e)
            | Ok g3 -> Assert.AreEqual(g3.Players, [| player1; player3; player2 |])

[<Test>]
let ``Unable To Add Player Already In Game`` () =
    let initialGame =
        { Id = Guid.NewGuid()
          State = PlayerRegistration
          Players =
            [| { Id = Guid.NewGuid()
                 Name = Guid.NewGuid().ToString()
                 Ready = false
                 Class = None
                 Creatures = [||]
                 RemainingEnergy = 0
                 MaxEnergy = 0
                 MutationDeck = [||]
                 MutationHand = [||] } |] }

    let game =
        Actions.Apply initialGame (Actions.AddPlayer(initialGame.Players[0].Id, initialGame.Players[0].Name))

    match game with
    | Ok g -> Assert.Fail("Should not be able to add player already in game")
    | Error e -> Assert.AreEqual(e, "You are already in this game")
