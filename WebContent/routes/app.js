var routerApp = angular.module("routerApp",['ui.router']);
 
routerApp.config(function($stateProvider) {
	  $stateProvider
		.state('home',{
			url:'/',
			 views: {  
                     home: {
                           templateUrl:'./partials/home.html',
                    }
                },
		})
		.state('details', {
                url: '/details/:id',
                views: {  
	 			home: {templateUrl:'./partials/home.html'},
					content:{templateUrl:'./partials/details.html',
					controller:"widgetController"
					}
                },
            })
		.state('addWidgets', {
                url: '/addWidgets',
                views: {  
                     addedit: {
                           templateUrl:'./partials/addWidgets.html',
                    }
                },
            })
		.state('edit', {
                url: '/edit/:id',
                views: {  
					addedit:{templateUrl:'./partials/edit.html',
					}
                },
            })
   })


// word filter start
routerApp.filter('words', function() {
  function isInteger(x) {
        return x % 1 === 0;
    }

  
  return function(value) {
    if (value && isInteger(value))
      return  toWords(value);
    
    return value;
  };

});


var th = ['','thousand','million', 'billion','trillion'];
var dg = ['zero','one','two','three','four', 'five','six','seven','eight','nine']; 
var tn = ['ten','eleven','twelve','thirteen', 'fourteen','fifteen','sixteen', 'seventeen','eighteen','nineteen'];
var tw = ['twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety']; 


function toWords(s)
{  
    s = s.toString(); 
    s = s.replace(/[\, ]/g,''); 
    if (s != parseFloat(s)) return 'not a number'; 
    var x = s.indexOf('.'); 
    if (x == -1) x = s.length; 
    if (x > 15) return 'too big'; 
    var n = s.split(''); 
    var str = ''; 
    var sk = 0; 
    for (var i=0; i < x; i++) 
    {
        if ((x-i)%3==2) 
        {
            if (n[i] == '1') 
            {
                str += tn[Number(n[i+1])] + ' '; 
                i++; 
                sk=1;
            }
            else if (n[i]!=0) 
            {
                str += tw[n[i]-2] + ' ';
                sk=1;
            }
        }
        else if (n[i]!=0) 
        {
            str += dg[n[i]] +' '; 
            if ((x-i)%3==0) str += 'hundred ';
            sk=1;
        }


        if ((x-i)%3==1)
        {
            if (sk) str += th[(x-i-1)/3] + ' ';
            sk=0;
        }
    }
    if (x != s.length)
    {
        var y = s.length; 
        str += 'point '; 
        for (var i=x+1; i<y; i++) str += dg[n[i]] +' ';
    }
    return str.replace(/\s+/g,' ');
}

window.toWords = toWords;

// word filter end