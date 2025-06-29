# Uncomment the required imports before adding the code

from django.shortcuts import render
from django.http import HttpResponseRedirect, HttpResponse
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404, render, redirect
from django.contrib.auth import logout
from django.contrib import messages
from datetime import datetime

from django.http import JsonResponse
from django.contrib.auth import login, authenticate
import logging
import json
from django.views.decorators.csrf import csrf_exempt
# from .populate import initiate


# Get an instance of a logger
logger = logging.getLogger(__name__)


# Create your views here.

# Create a `login_request` view to handle sign in request
@csrf_exempt
def login_user(request):
    # Get username and password from request.POST dictionary
    data = json.loads(request.body)
    username = data['userName']
    password = data['password']
    # Try to check if provide credential can be authenticated
    user = authenticate(username=username, password=password)
    data = {"userName": username}
    if user is not None:
        # If user is valid, call login method to login current user
        login(request, user)
        data = {"userName": username, "status": "Authenticated"}
    return JsonResponse(data)

# Create a `logout_request` view to handle sign out request
def logout_request(request):
    # ...
    logout(request) #Terminates session for us
    data = {"userName":""} # Return empty username
    return JsonResponse(data)



# Create a `registration` view to handle sign up request
@csrf_exempt
def registration(request):
    data = json.loads(request.body) #Retrieves the JSON being sent out by the front-end
    username = data['userName']

    userExists = False #Flag 

    try:
        User.objects.get(username = username)
        userExists = True
    except:
        # If not, simply log this is a new user
        logger.debug("{} is new user".format(username))

    if(userExists):
        data = {"message":"User already exists"}
        # return JsonResponse(data)
    else:
        password = data['password']
        firstName = data['firstName']
        lastName = data['lastName']
        email = data['email']
        User.objects.create_user(
            username=username, 
            password=password, 
            first_name=firstName, 
            last_name=lastName, 
            email=email
            )
        data = {"userName": username, "message": "Registered"}
        # return JsonResponse(data)

    return JsonResponse(data)





# # Update the `get_dealerships` view to render the index page with
# a list of dealerships
# def get_dealerships(request):
# ...

# Create a `get_dealer_reviews` view to render the reviews of a dealer
# def get_dealer_reviews(request,dealer_id):
# ...

# Create a `get_dealer_details` view to render the dealer details
# def get_dealer_details(request, dealer_id):
# ...

# Create a `add_review` view to submit a review
# def add_review(request):
# ...
