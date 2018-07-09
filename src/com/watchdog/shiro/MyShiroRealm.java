package com.watchdog.shiro;

import java.io.IOException;
import java.io.Reader;
import java.util.HashSet;
import java.util.Set;

import javax.annotation.Resource;

import org.apache.commons.lang.builder.ReflectionToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.subject.Subject;

import com.watchdog.model.Managers;
import com.watchdog.service.UserService;


public class MyShiroRealm extends AuthorizingRealm {
	@Resource
	private UserService userService;
	
	/* 
     * 授权
     */
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) { 
        Set<String> roleNames = new HashSet<String>();  
        Set<String> permissions = new HashSet<String>();  
        roleNames.add("administrator");//添加角色
        permissions.add("newPage.jsp");  //添加权限
        SimpleAuthorizationInfo info = new SimpleAuthorizationInfo(roleNames);  
        info.setStringPermissions(permissions);  
        return info;  
        
//        String username = (String) principals.getPrimaryPrincipal();
//        User user = new User();
//        user.setUsername(username);
//        SimpleAuthorizationInfo authorizationInfo = new SimpleAuthorizationInfo();
//        //为用户授权,只需将用户的权限添加到info即可
//        info.addStringPermission("delete");
//        List roleList = userService.getRole(user);
//        if(roleList != null){
//            for (Role role : roleList) {
//                authorizationInfo.addRole(role.getName());
//            }
//            return authorizationInfo;
//        }
//        return null;
    }
    
    /* 
	 * 登录验证
	 */
    
//	@Override
//	protected AuthenticationInfo doGetAuthenticationInfo(
//			AuthenticationToken authcToken) throws AuthenticationException {
//		UsernamePasswordToken token = (UsernamePasswordToken) authcToken;
//		AESUtil aes = new AESUtil();
//		if(token.getUsername().equals(USER_NAME)){
//			try {
//				return new SimpleAuthenticationInfo(USER_NAME, aes.encryptData(PASSWORD), getName());
//			} catch (Exception e) {
//				// TODO Auto-generated catch block
//				e.printStackTrace();
//			}  
//		}else{
//			throw new AuthenticationException();  
//		}
//		return null;
//	}
	
	    @Override
	    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authcToken) throws AuthenticationException {
	        //获取基于用户名和密码的令牌
	        //实际上这个authcToken是从LoginController里面currentUser.login(token)传过来的
	        //两个token的引用都是一样的，本例中是：org.apache.shiro.authc.UsernamePasswordToken@33799a1e
	        UsernamePasswordToken token = (UsernamePasswordToken)authcToken;
	        System.out.print("验证当前Subject时获取到token：");
	        System.out.println(ReflectionToStringBuilder.toString(token, ToStringStyle.MULTI_LINE_STYLE));
	        Managers user = userService.checklogin(token.getUsername());
	//	        此处无需比对，比对的逻辑Shiro会做，我们只需返回一个和令牌相关的正确的验证信息
	//	        说白了就是第一个参数填登录用户名，第二个参数s填合法的登录密码（可以是从数据库中取到的，本例中为了演示就硬编码了）
	//	        这样一来，在随后的登录页面上就只有这里指定的用户和密码才能通过验证
	        if(null != user){
	            String username = user.getUsername();
	            String password = user.getPassword();
	            AuthenticationInfo authcInfo = new SimpleAuthenticationInfo(username, password,this.getName());
	            return authcInfo;
	        }else{
	            return null;
	        }
	     
	    }
	  
	  /**
	     * 将一些数据放到ShiroSession中，以便于其它地方使用
	     * 比如Controller里面，使用时直接用HttpSession.getAttribute(key)就可以取到
	     */
	    private void setAuthenticationSession(Object value){
	        Subject currentUser = SecurityUtils.getSubject();
	        if(null != currentUser){
	            Session session = currentUser.getSession();
	            System.out.println("当前Session超时时间为[" + session.getTimeout() + "]毫秒");
	            session.setTimeout(1000 * 60 * 60 * 2);
	            System.out.println("修改Session超时时间为[" + session.getTimeout() + "]毫秒");
	            session.setAttribute("currentUser", value);
	        }
	    }
	    
	    private SqlSession session;
	    public SqlSession UserDaoImpl(){
			//使用类加载器加载mybatis的配置文件（它也加载关联的映射文件）  
	        String resource = "mybatis-config.xml";      
	        Reader reader;
			try {
				reader = Resources.getResourceAsReader(resource);
				SqlSessionFactoryBuilder sqlSessionFactoryBuilder = new SqlSessionFactoryBuilder();      
		        SqlSessionFactory sqlSessionFactory = sqlSessionFactoryBuilder.build(reader);  
		        session = sqlSessionFactory.openSession(); 
			}catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} 
			return session;
		}

}
