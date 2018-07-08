var template = '<i class="translate-icon-close"></i>' + 
               '<div class="main-meaning">' + 
                   '<p class="main-meaning-title">主要意思：</p>' + 
                   '<p class="main-meaning-content"><% this.mainMeaning %></p>' + 
               '</div>' + 
               '<div class="common-meanings">' + 
                   '<p class="common-meanings-title">常见意思：</p>' + 
                   '<p class="common-meanings-content"><% this.commonMeanings %></p>' + 
               '</div>' + 
               '<div class="detailed-meanings">' + 
                   '<% for (var i in this.detailedMeanings) { %>' + 
                       '<p class="detailed-meanings-title">单词详解：</p>' + 
                       '<p class="detailed-meanings-content">' + 
                           '<span class="word-type"><% this.detailedMeanings[i].type %></span>' + 
                           '<span class="word-meaning"><% ": " + this.detailedMeanings[i].meaning %></span>' + 
                       '</p>' + 
                   '<% } %>' + 
               '</div>';