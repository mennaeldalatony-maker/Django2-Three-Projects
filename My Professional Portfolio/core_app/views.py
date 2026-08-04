from django.shortcuts import render

def portfolio_index(request):
    """
    Renders the portfolio home page directly using clean templates & static assets.
    """
    return render(request, 'core/index.html')
