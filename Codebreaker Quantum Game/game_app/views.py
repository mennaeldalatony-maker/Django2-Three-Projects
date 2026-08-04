from django.shortcuts import render

def game_index(request):
    """
    Renders the main Codebreaker Quantum Decryptor game page.
    """
    return render(request, 'game/index.html')
