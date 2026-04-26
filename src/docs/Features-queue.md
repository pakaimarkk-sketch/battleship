1. computer logic
    -3 difficulties easy/medium/hard

2. GameController logic
    -game modes
        -Singleplayer/Multiplayer/LAN 
        -classic/modern/custom modes 
    -game flow
        -turn order
            -against bot
            -against human
        -checking win condition
        -re-render
3. UI implementation
    -Opening screen
        Welcome!
        Select username (play without registration)

    -Menu
        -Singleplayer
            -choose gamemode
                --Option screen for custom
            -choose difficulty
            after Start 
                -current.rules listed so you know whats up
                -game start after you close modal
                
        -Multiplayer
            -create lobby
                -choose gamemode (classic, modern, custom)
                    -Option screen for custom
                    after Start 
                        -you are given the lobby code
                        -current.rules listed so you know whats up and waiting for other player to join....
            -join lobby
                -enter id to join lobby
                    -after join you get the current.rules listed so you know whats up
            game start after both players close modal, Waiting for other player...
            
        -LAN
            -choose gamemode
                --Option screen for custom
            -choose difficulty
            after Start 
                -current.rules listed so you know whats up
                -game start after you close modal
        -Settings
            -music volume
            -what else
        -About game 
            that mainly contains different submenus for:
            -classic rules
            -modern rules
            -custom rules
            -what this game about?



Core system


Phase 1

    Features
        Ship class
        Gameboard class
        Player class
        ComputerLogic easy mode
        GameController
        win condition
        tests for logic

    Implementation
        build and test each class separately
        connect them through GameController
        make sure a full match can happen without UI

    Done means
        human and computer can attack
        turns work
        winner is detected
        tests pass


Phase 2

    Features
        render player board
        render enemy board
        click enemy tiles to attack
        show hit / miss
        show computer turn result
        show winner text
        restart game button
    Implementation
        create one main game screen
        build a render module for boards
        add event listeners for enemy board clicks
        call controller methods only
        re-render after each move
    Done means
        you can open the app and play a full match against easy bot


Phase 3

    Features
        reusable DOM helpers
        separate render modules
        basic screen structure
        status/message area
        cleaner layout and styling
    Implementation
        separate game screen from rendering logic
        keep controller free from DOM code
        make renderBoard(board, options) style helpers
    Done means
        UI code is not spaghetti
        adding new screens becomes easier

Phase 4

    Features
        main menu
        singleplayer button
        settings button
        about screen
        back buttons / navigation
    Implementation
        add a screen controller or app controller
        keep current screen in simple app-level state
        render different screens from one root container
    Done means
        user does not drop directly into match unless you want that
        navigation works cleanly

Phase 5

    Features
        easy mode: random legal move
        medium mode: checker/parity hunt
        hard mode: advanced hunt + target mode
    Implementation
        keep ComputerLogic separate
        branch by difficulty
        add internal helper methods for move generation
        only build medium after easy is solid
        only build hard after medium is solid
    Done means
        difficulty changes bot behavior, not just labels

Phase 6

    Features
        random ship placement
        manual placement
        rotate ship direction
        validation feedback
    Implementation
        first add random placement for both sides
        then add manual placement UI for human
        use Gameboard.placeShip() validation
        add placement phase before match phase
    Done means
        users can set up their own board before battle



Online Multiplayer Vision
legyen online játék
legyen ranked rendszer ELO-val
rankedhez inkább Find Match
barátokhoz inkább Private Lobby / Room Code
public lobby list opcionális, nem kötelező