var template = '<i class="translate-icon-close"></i>' +
               '<p class="mainMeaning"><% this.mainMeaning %></p>' + 
               '<p class="commonMeanings"><% this.commonMeanings %></p>' + 
               '<% for (var i in this.detailedMeanings) { %>' + 
                   '<p><% this.detailedMeanings[i].type + ": " + this.detailedMeanings[i].meaning %></p>' + 
               '<% } %>';