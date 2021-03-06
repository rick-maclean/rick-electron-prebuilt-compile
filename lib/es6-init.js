'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _electronCompile = require('electron-compile');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function findPackageJson(initScript) {
  if (initScript === '/' || initScript.match(/^[A-Za-z]:$/)) {
    throw new Error("Can't find package.json");
  }

  // Walk up the parent directories until we find package.json. Make sure that
  // we're not actually stumbling upon a parent npm package
  let ret = _path2.default.join(initScript, 'package.json');
  if (_fs2.default.statSyncNoException(ret) && !_path2.default.resolve(_path2.default.dirname(ret), '..').match(/[\\\/]node_modules$/i)) {
    return ret;
  }

  return findPackageJson(_path2.default.dirname(initScript));
}

function main() {
  const initScript = _path2.default.resolve(process.argv[2]);
  const packageJson = findPackageJson(initScript);

  // Reconstitute the original arguments
  const args = process.argv.slice(2);
  process.argv = [process.argv[0]].concat(args);

  //passthrough electron-compile command args if it's specified
  const parsedArgs = require('yargs').alias('c', 'cachedir').alias('s', 'sourcemapdir').argv;
  (0, _electronCompile.init)(_path2.default.dirname(packageJson), initScript, null, parsedArgs.c || null, parsedArgs.s || null);
}

main();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9lczYtaW5pdC5qcyJdLCJuYW1lcyI6WyJmaW5kUGFja2FnZUpzb24iLCJpbml0U2NyaXB0IiwibWF0Y2giLCJFcnJvciIsInJldCIsImpvaW4iLCJzdGF0U3luY05vRXhjZXB0aW9uIiwicmVzb2x2ZSIsImRpcm5hbWUiLCJtYWluIiwicHJvY2VzcyIsImFyZ3YiLCJwYWNrYWdlSnNvbiIsImFyZ3MiLCJzbGljZSIsImNvbmNhdCIsInBhcnNlZEFyZ3MiLCJyZXF1aXJlIiwiYWxpYXMiLCJjIiwicyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQSxTQUFTQSxlQUFULENBQXlCQyxVQUF6QixFQUFxQztBQUNuQyxNQUFJQSxlQUFlLEdBQWYsSUFBc0JBLFdBQVdDLEtBQVgsQ0FBaUIsYUFBakIsQ0FBMUIsRUFBMkQ7QUFDekQsVUFBTSxJQUFJQyxLQUFKLENBQVUseUJBQVYsQ0FBTjtBQUNEOztBQUVEO0FBQ0E7QUFDQSxNQUFJQyxNQUFNLGVBQUtDLElBQUwsQ0FBVUosVUFBVixFQUFzQixjQUF0QixDQUFWO0FBQ0EsTUFBSSxhQUFHSyxtQkFBSCxDQUF1QkYsR0FBdkIsS0FBK0IsQ0FBQyxlQUFLRyxPQUFMLENBQWEsZUFBS0MsT0FBTCxDQUFhSixHQUFiLENBQWIsRUFBZ0MsSUFBaEMsRUFBc0NGLEtBQXRDLENBQTRDLHNCQUE1QyxDQUFwQyxFQUF5RztBQUN2RyxXQUFPRSxHQUFQO0FBQ0Q7O0FBRUQsU0FBT0osZ0JBQWdCLGVBQUtRLE9BQUwsQ0FBYVAsVUFBYixDQUFoQixDQUFQO0FBQ0Q7O0FBRUQsU0FBU1EsSUFBVCxHQUFnQjtBQUNkLFFBQU1SLGFBQWEsZUFBS00sT0FBTCxDQUFhRyxRQUFRQyxJQUFSLENBQWEsQ0FBYixDQUFiLENBQW5CO0FBQ0EsUUFBTUMsY0FBY1osZ0JBQWdCQyxVQUFoQixDQUFwQjs7QUFFQTtBQUNBLFFBQU1ZLE9BQU9ILFFBQVFDLElBQVIsQ0FBYUcsS0FBYixDQUFtQixDQUFuQixDQUFiO0FBQ0FKLFVBQVFDLElBQVIsR0FBZSxDQUFDRCxRQUFRQyxJQUFSLENBQWEsQ0FBYixDQUFELEVBQWtCSSxNQUFsQixDQUF5QkYsSUFBekIsQ0FBZjs7QUFFQTtBQUNBLFFBQU1HLGFBQWFDLFFBQVEsT0FBUixFQUFpQkMsS0FBakIsQ0FBdUIsR0FBdkIsRUFBNEIsVUFBNUIsRUFBd0NBLEtBQXhDLENBQThDLEdBQTlDLEVBQW1ELGNBQW5ELEVBQW1FUCxJQUF0RjtBQUNBLDZCQUFLLGVBQUtILE9BQUwsQ0FBYUksV0FBYixDQUFMLEVBQWdDWCxVQUFoQyxFQUE0QyxJQUE1QyxFQUFrRGUsV0FBV0csQ0FBWCxJQUFnQixJQUFsRSxFQUF3RUgsV0FBV0ksQ0FBWCxJQUFnQixJQUF4RjtBQUNEOztBQUVEWCIsImZpbGUiOiJlczYtaW5pdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBmcyBmcm9tICdmcyc7XHJcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xyXG5pbXBvcnQge2luaXR9IGZyb20gJ2VsZWN0cm9uLWNvbXBpbGUnO1xyXG5cclxuZnVuY3Rpb24gZmluZFBhY2thZ2VKc29uKGluaXRTY3JpcHQpIHtcclxuICBpZiAoaW5pdFNjcmlwdCA9PT0gJy8nIHx8IGluaXRTY3JpcHQubWF0Y2goL15bQS1aYS16XTokLykpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihcIkNhbid0IGZpbmQgcGFja2FnZS5qc29uXCIpO1xyXG4gIH1cclxuXHJcbiAgLy8gV2FsayB1cCB0aGUgcGFyZW50IGRpcmVjdG9yaWVzIHVudGlsIHdlIGZpbmQgcGFja2FnZS5qc29uLiBNYWtlIHN1cmUgdGhhdFxyXG4gIC8vIHdlJ3JlIG5vdCBhY3R1YWxseSBzdHVtYmxpbmcgdXBvbiBhIHBhcmVudCBucG0gcGFja2FnZVxyXG4gIGxldCByZXQgPSBwYXRoLmpvaW4oaW5pdFNjcmlwdCwgJ3BhY2thZ2UuanNvbicpXHJcbiAgaWYgKGZzLnN0YXRTeW5jTm9FeGNlcHRpb24ocmV0KSAmJiAhcGF0aC5yZXNvbHZlKHBhdGguZGlybmFtZShyZXQpLCAnLi4nKS5tYXRjaCgvW1xcXFxcXC9dbm9kZV9tb2R1bGVzJC9pKSkge1xyXG4gICAgcmV0dXJuIHJldDtcclxuICB9XHJcblxyXG4gIHJldHVybiBmaW5kUGFja2FnZUpzb24ocGF0aC5kaXJuYW1lKGluaXRTY3JpcHQpKTtcclxufVxyXG5cclxuZnVuY3Rpb24gbWFpbigpIHtcclxuICBjb25zdCBpbml0U2NyaXB0ID0gcGF0aC5yZXNvbHZlKHByb2Nlc3MuYXJndlsyXSk7XHJcbiAgY29uc3QgcGFja2FnZUpzb24gPSBmaW5kUGFja2FnZUpzb24oaW5pdFNjcmlwdCk7XHJcblxyXG4gIC8vIFJlY29uc3RpdHV0ZSB0aGUgb3JpZ2luYWwgYXJndW1lbnRzXHJcbiAgY29uc3QgYXJncyA9IHByb2Nlc3MuYXJndi5zbGljZSgyKTtcclxuICBwcm9jZXNzLmFyZ3YgPSBbcHJvY2Vzcy5hcmd2WzBdXS5jb25jYXQoYXJncyk7XHJcblxyXG4gIC8vcGFzc3Rocm91Z2ggZWxlY3Ryb24tY29tcGlsZSBjb21tYW5kIGFyZ3MgaWYgaXQncyBzcGVjaWZpZWRcclxuICBjb25zdCBwYXJzZWRBcmdzID0gcmVxdWlyZSgneWFyZ3MnKS5hbGlhcygnYycsICdjYWNoZWRpcicpLmFsaWFzKCdzJywgJ3NvdXJjZW1hcGRpcicpLmFyZ3Y7XHJcbiAgaW5pdChwYXRoLmRpcm5hbWUocGFja2FnZUpzb24pLCBpbml0U2NyaXB0LCBudWxsLCBwYXJzZWRBcmdzLmMgfHwgbnVsbCwgcGFyc2VkQXJncy5zIHx8IG51bGwpO1xyXG59XHJcblxyXG5tYWluKClcclxuIl19