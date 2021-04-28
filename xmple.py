import json
import random

def hangman(movieName):
    movie = list(movieName.upper())
    ans = []
    guessed = []
    tries = 10
    win = False
    for i in movie:
        if(i != ' ' ):
            ans.append('_')
        else:
            ans.append(' ')

    while '_' in ans and tries>0:
        finalAns = ''
        guess = str(input('Enter your guess:'))
        guess = guess.upper()
        if guess not in guessed:
            guessed.append(guess)
            if guess in movie:
                for i in range(len(movie)):
                    if(movie[i] == guess):
                        ans[i] = guess
            else:            
                tries-=1
        else:
            print('You have already guessed this')
        for i in ans:
            finalAns += i+' ' 
        print(finalAns,'tries left:'+str(tries))
        if(movie == ans):
            win = True
            print('you won looser!')
    if(win == False):
        print('Game over,Loosers!!!')
    if(input('Do you want to play again? Y or N:') == 'Y'):
        chooseGameMode()
    else:
        print('Game ended!')

def chooseGameMode():
    gameMode = input('choose game mode: 1.Random movie 2.Choose movie:')
    if gameMode == '2':
        movieName = input('Enter a movie name:')
        hangman(movieName)
    else:
        randomNum = random.randint(0,len(data))
        randMovieNameList = list(data[randomNum].values())
        randMovieName = randMovieNameList[0]
        print(randMovieName)
        hangman(randMovieName)        

f = open('movieName.json')
data = json.load(f)

chooseGameMode()




# for i in range(tries):
#     if(updateAns(movie,ans) == False):
#         tries-=1
#     else:
#         print(ans)
        

