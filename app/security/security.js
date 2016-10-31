(function(){
/**
 * @author: H.Linh
 * created on Oct 28, 2016
 * @Description: This module provides several services to protect 
 * client app from attackers
 */
var Security = angular.module('Security', []);

/**
 * This service provide safe way to display content from user's input.
 * Encode user's string before show it
 */
Security.factory('AntiXSS', function(){
  return {
    encode: function(str){
      return str
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\//g, '&#x2F;');
    },
    decode: function(str){
      return str
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .replace(/&#x2F;/g, '/');
    }
  };
});


})();